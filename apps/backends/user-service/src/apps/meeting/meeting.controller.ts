import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateStreamDto, UpdateMeetingDto } from './dto/meeting.dto';
import { MeetingDocument } from './meeting.model';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post('create/:userId')
  async createMeeting(
    @Body() newMeetingDto: CreateStreamDto,
    @Param('userId') userId: string,
  ): Promise<MeetingDocument> {
    return this.meetingService.createMeeting(userId, newMeetingDto);
  }

  @Post('get/:meetingId')
  async getMeetingById(
    @Param('meetingId') meetingId: string,
  ): Promise<MeetingDocument> {
    return this.meetingService.getMeetingById(meetingId);
  }

  @Post('get-all/:userId')
  async getAllUsersMeeting(
    @Param('userId') userId: string,
  ): Promise<MeetingDocument[]> {
    return this.meetingService.getAllUsersMeeting(userId);
  }

  @Post('update/:meetingId')
  async updateMeeting(
    @Param('meetingId') meetingId: string,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ): Promise<MeetingDocument> {
    return this.meetingService.updateMeeting(meetingId, updateMeetingDto);
  }

  @Post('delete/:meetingId')
  async deleteMeeting(
    @Param('meetingId') meetingId: string,
  ): Promise<MeetingDocument> {
    return this.meetingService.deleteMeeting(meetingId);
  }
}
