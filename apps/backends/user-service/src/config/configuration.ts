export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  mongodb: process.env.MONGO_URL,
  rabbitMq: process.env.RABBITMQ_URL,
  globalPrefix: 'api-v1',
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
  },
  agoraAppId: process.env.AGORA_APP_ID,
  agoraAppCertificate: process.env.AGORA_APP_CERTIFICATE,
});
