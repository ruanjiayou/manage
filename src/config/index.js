module.exports = {
  PORT: 3334,
  timezone: '+08:00',
  language: 'zh-CN',
  mongo: {
    host: '127.0.0.1',
    port: '27017',
    user: 'root',
    pass: '123456',
    db: 'manage',
    query: {
      authSource: 'admin'
    }
  },
  USER_TOKEN_SECRET: 'lp#yBMS0f!4IleTVnpA@'
}