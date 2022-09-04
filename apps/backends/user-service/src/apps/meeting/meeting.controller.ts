import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from '../../common';
import { ApiResponse } from '../../util';
import { CreateStreamDto, UpdateMeetingDto } from './dto/meeting.dto';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post('create/:userId')
  async createMeeting(
    @Body() newMeetingDto: CreateStreamDto,
    @Param('userId') userId: string,
  ): Promise<ApiResponse> {
    console.log(userId);
    return this.meetingService.createMeeting(userId, newMeetingDto);
  }

  @Get('get/:meetingId')
  async getMeetingById(
    @Param('meetingId') meetingId: string,
  ): Promise<ApiResponse> {
    return this.meetingService.getMeetingById(meetingId);
  }

  @Get('get-all/:userId')
  async getAllUsersMeeting(
    @Param('userId') userId: string,
  ): Promise<ApiResponse> {
    return this.meetingService.getAllUsersMeeting(userId);
  }

  @Post('update/:meetingId')
  async updateMeeting(
    @Param('meetingId') meetingId: string,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ): Promise<ApiResponse> {
    return this.meetingService.updateMeeting(meetingId, updateMeetingDto);
  }

  @Post('delete/:meetingId')
  async deleteMeeting(
    @Param('meetingId') meetingId: string,
  ): Promise<ApiResponse> {
    return this.meetingService.deleteMeeting(meetingId);
  }

  @Get('generate-token/:meetingId')
  @Public()
  generateAgoraToken(@Param('meetingId') meetingId: string): {
    token: string;
    success: string;
  } {
    return this.meetingService.generateAgoraToken(meetingId);
  }

  @Get('public/meetings')
  async getAllPublicMeetings(): Promise<ApiResponse> {
    return this.meetingService.getAllPublicMeetings();
  }
}
