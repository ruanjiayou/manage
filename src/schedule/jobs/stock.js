const constant = require('../../constant')
const stockHelper = require('../../utils/stockHelper')
const dayjs = require('../../utils/dayjs')

module.exports = {
  name: 'stock',
  rule: '0 0 16 * * 1-5',
  async tick(date, app) {
    const d = dayjs(date).format('YYYY-MM-DD')
    const { stockBLL, klineBLL } = app.BLL;
    if (!constant.HOLIDAY.includes(d)) {
      // holiday
      console.log(this.name, date);
      const items = await stockBLL.getAll({ lean: true, attrs: { se: 1, code: 1, } })
      for (let i = 0; i < items.length; i++) {
        const stock = items[i]
        console.log(stock.se + stock.code)
        const data = await stockHelper(stock.se + stock.code)
        if (data) {
          const { line, ...other } = data
          if (data.amount !== 0) {
            // 停牌判断
            await stockBLL.update({ where: { code: stock.code, se: stock.se }, data: { $set: { price: data.end } } });
          }
          await klineBLL.update({ where: { code: stock.code, se: stock.se, date: stock.date }, data: { $setOnInsert: data }, options: { upsert: true } })
        }
      }
    }

  },
}