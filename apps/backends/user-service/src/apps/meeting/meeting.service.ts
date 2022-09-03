import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Meeting as MeetingModel, MeetingDocument } from './meeting.model';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { CreateStreamDto, UpdateMeetingDto } from './dto/meeting.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(MeetingModel.name)
    private readonly meetingModel: Model<MeetingDocument>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async createMeeting(
    userId: string,
    meetingDto: CreateStreamDto,
  ): Promise<MeetingDocument> {
    const userExists = await this.userService.getUserById(userId);

    if (!userExists) {
      throw new Error('User not found');
    }

    const meeting = await this.meetingModel.create({
      ...meetingDto,
      link: 'https://pp-stream.live/' + uuidv4(),
    });

    return meeting;
  }

  async getMeetingById(meetingId: string): Promise<MeetingDocument> {
    const meeting = await this.meetingModel.findById(meetingId);

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    return meeting;
  }

  async getAllUsersMeeting(userId: string): Promise<MeetingDocument[]> {
    const userExists = await this.userService.getUserById(userId);

    if (!userExists) {
      throw new Error('User not found');
    }

    const meetings = await this.meetingModel
      .find({
        creatorId: userId,
      })
      .populate('liveUsers.userId');

    return meetings;
  }

  async updateMeeting(
    meetingId: string,
    updateInfo: UpdateMeetingDto,
  ): Promise<MeetingDocument> {
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

    return updatedMeeting;
  }

  async closeMeeting(meetingId: string): Promise<MeetingDocument> {
    const meeting = await this.meetingModel.findById(meetingId);

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    meeting.closed = true;
    // Broadcast to remove all users from stream

    await meeting.save();

    return meeting;
  }

  async deleteMeeting(meetingId: string): Promise<MeetingDocument> {
    const meeting = await this.meetingModel.findById(meetingId);

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    await meeting.remove({ new: true });

    return meeting;
  }
}
