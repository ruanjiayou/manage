const constant = require('../../constant')
const dayjs = require('dayjs')

module.exports = {
  name: 'stock',
  rule: '0 24 */16 * * 1-5',
  tick(date, app) {
    const d = dayjs(date).format('YYYY-MM-DD')
    if (!constant.HOLIDAY.includes(d)) {
      // holiday
      console.log(this.name, date);
    }

  },
}