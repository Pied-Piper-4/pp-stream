import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentDocument } from './comment.model';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create/:userId/:meetingId')
  async createComment(
    @Param('userId') userId: string,
    @Param('meetingId') meetingId: string,
    @Body('text') text: string,
  ): Promise<CommentDocument> {
    return this.commentService.createComment(userId, meetingId, text);
  }

  @Post('get/:commentId')
  async getCommentById(
    @Param('commentId') commentId: string,
  ): Promise<CommentDocument> {
    return this.commentService.getCommentById(commentId);
  }

  @Post('get-all/:meetingId')
  async getAllCommentsByMeetingId(
    @Param('meetingId') meetingId: string,
  ): Promise<CommentDocument> {
    return this.commentService.getAllCommentsByMeetingId(meetingId);
  }
}
