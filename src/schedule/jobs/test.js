module.exports = {
  name: 'test',
  rule: '0 0 */1 * * *',
  tick(date, app) {
    console.log(this.name, date);
  },
}