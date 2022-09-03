import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';
import { IRMQQueue } from '../interface';

export const AdminExchange: RabbitMQExchangeConfig = {
  name: 'admin-exchange',
  type: 'direct',
  options: {
    durable: true,
    autoDelete: false,
  },
};

export const UserExchange: RabbitMQExchangeConfig = {
  name: 'user-exchange',
  type: 'direct',
  options: {
    durable: true,
    autoDelete: false,
  },
};

export const AdminQueue: IRMQQueue = {
  name: 'henosis-admin-auth-queue',
  key: 'henosis-admin-auth-queue-key',
};

export const UserQueue: IRMQQueue = {
  name: 'henosis-user-auth-queue',
  key: 'henosis-user-auth-queue-key',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const DEFAULT_LIMIT = 100;
export const DEFAULT_SORT = { createdAt: '-1' };
