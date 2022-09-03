import { MeetingDocument } from './meeting.model';

export interface CreateMeetingResponse {
  meeting: MeetingDocument;
  token: string;
  isSelf?: boolean;
}
