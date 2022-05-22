const dayjs = require('../../utils/dayjs')

module.exports = {
  name: 'test',
  rule: '0 */10 * * * *',
  tick(date, app) {
    console.log(this.name, dayjs.utc(date).tz('Asia/Shanghai').format());
  },
}