export interface IRMQExchange {
  name: string;
  type: 'direct' | 'topic' | 'fanout' | 'headers';
}
