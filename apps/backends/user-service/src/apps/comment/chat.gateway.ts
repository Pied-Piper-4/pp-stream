import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { IChatSending } from './chat.interface';
import { CommentService } from './comment.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private commentService: CommentService) {}
  @WebSocketServer() server;
  users = 0;

  async handleConnection() {
    // A client has connected
    this.users++;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client, message) {
    console.log('message', message);
    client.broadcast.emit('chat', message);
  }

  @SubscribeMessage('join-room')
  async onJoinRoom(client, room) {
    room = JSON.parse(room);
    client.join(room.room);
  }

  @SubscribeMessage('send-to-room')
  async onSendToRoom(client, data) {
    const messageToSend: IChatSending = JSON.parse(data);
    // Save message to database
    // Broadcast message to room
    const comment = await this.commentService.createComment(
      messageToSend.userId,
      messageToSend.meetingId,
      messageToSend.text,
    );
    console.log('comment', comment);
    client.to(messageToSend.meetingId).emit('send-to-room', comment);
  }
}
