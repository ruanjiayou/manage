module.exports = {
  PORT: 3334,
  timezone: '+08:00',
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
}