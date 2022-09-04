import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Meeting as MeetingModel, MeetingDocument } from './meeting.model';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { CreateStreamDto, UpdateMeetingDto } from './dto/meeting.dto';
import { UserService } from '../user/user.service';
import {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} from 'agora-access-token';
import { ConfigService } from '@nestjs/config';
import { CreateMeetingResponse } from './meeting.interface';
import { ApiResponse } from '../../util';

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(MeetingModel.name)
    private readonly meetingModel: Model<MeetingDocument>,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  generateAgoraToken(
    meetingId: string,
    isPublisher?: boolean,
  ): {
    token: string;
    success: string;
  } {
    const appId = this.configService.get('agoraAppId');
    const appCertificate = this.configService.get('agoraAppCertificate');
    console.log(appId, appCertificate);
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      meetingId,
      772155,
      isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER,
      0,
    );

    return {
      token,
      success: 'success',
    };
  }

  async createMeeting(
    userId: string,
    meetingDto: CreateStreamDto,
  ): Promise<ApiResponse> {
    const userExists = await this.userService.getUserById(userId);

    if (!userExists) {
      throw new Error('User not found');
    }

    const meeting = await this.meetingModel.create({
      ...meetingDto,
      link: 'https://pp-stream.live/' + uuidv4(),
      creatorId: userId,
    });

    const meetingToken = this.generateAgoraToken(meeting._id, true);

    return {
      status: 'success',
      token: meetingToken.token,
      data: meeting,
      message: 'Meeting created successfully',
    };
  }

  async getMeetingById(meetingId: string): Promise<ApiResponse> {
    const meeting = await this.meetingModel.findById(meetingId);

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    return {
      status: 'success',
      data: meeting,
      message: 'Meeting fetched successfully',
    };
  }

  async getAllUsersMeeting(userId: string): Promise<ApiResponse> {
    const userExists = await this.userService.getUserById(userId);

    if (!userExists) {
      throw new Error('User not found');
    }

    const meetings = await this.meetingModel
      .find({
        creatorId: userId,
      })
      .populate('creatorId')
      .populate('liveUsers.userId');

    return {
      status: 'success',
      data: meetings,
      message: 'Meetings fetched successfully',
    };
  }

  async updateMeeting(
    meetingId: string,
    updateInfo: UpdateMeetingDto,
  ): Promise<ApiResponse> {
    const meeting = await this.meetingModel.findById(meetingId);

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    const updatedMeeting = await this.meetingModel.findByIdAndUpdate(
      meetingId,
      updateInfo,
      {
        new: true,
      },
    );

    return {
      status: 'success',
      data: updatedMeeting,
      message: 'Meeting updated successfully',
    };
  }

  async closeMeeting(meetingId: string): Promise<ApiResponse> {
    const meeting = await this.meetingModel.findById(meetingId);

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    meeting.closed = true;
    // Broadcast to remove all users from stream

    await meeting.save();

    return {
      status: 'success',
      data: meeting,
      message: 'Meeting closed successfully',
    };
  }

  async deleteMeeting(meetingId: string): Promise<ApiResponse> {
    const meeting = await this.meetingModel.findById(meetingId);

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    await meeting.remove({ new: true });

    return {
      status: 'success',
      data: meeting,
      message: 'Meeting deleted successfully',
    };
  }

  async getAllPublicMeetings(): Promise<ApiResponse> {
    const meetings = await this.meetingModel
      .find({
        isPrivate: false,
      })
      .populate('creatorId')
      .populate('liveUsers.userId');

    return {
      status: 'success',
      data: meetings,
      message: 'Meetings fetched successfully',
    };
  }
}
