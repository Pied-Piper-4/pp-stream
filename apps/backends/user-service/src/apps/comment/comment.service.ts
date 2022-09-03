import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeetingService } from '../meeting/meeting.service';
import { UserService } from '../user/user.service';
import { Comment as CommentModel, CommentDocument } from './comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentModel.name)
    private commentModel: Model<CommentDocument>,
    private userService: UserService,
    private meetingService: MeetingService,
  ) {}

  async createComment(
    userId: string,
    meetingId: string,
    text: string,
  ): Promise<CommentDocument> {
    const userExists = await this.userService.getUserById(userId);

    if (!userExists) {
      throw new Error('User not found');
    }

    const meetingExists = await this.meetingService.getMeetingById(meetingId);

    if (!meetingExists) {
      // push comment to meeting
      const pushComment = await this.commentModel.findByIdAndUpdate(
        meetingId,
        {
          $push: {
            comments: {
              userId,
              text,
            },
          },
        },
        { new: true },
      );
      return pushComment;
    }

    const comment = await this.commentModel.create({
      userId,
      meetingId,
      comments: [
        {
          userId,
          text,
        },
      ],
    });

    return comment;
  }

  async getCommentById(commentId: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new Error('Comment not found');
    }

    return comment;
  }

  async getAllCommentsByMeetingId(meetingId: string): Promise<CommentDocument> {
    const meetingExists = await this.meetingService.getMeetingById(meetingId);

    if (!meetingExists) {
      throw new Error('Meeting not found');
    }

    const comments = await this.commentModel
      .findOne({
        meetingId,
      })
      .populate('comments.userId');

    return comments;
  }
}
