const config = require('../../config/index')
const constant = require('../../constant')
const fetch = require('node-fetch');
const stockHelper = require('../../utils/stockHelper')
const dayjs = require('../../utils/dayjs')

module.exports = {
  name: 'rzrq',
  rule: '0 30 16 * * 1-5',
  async tick(date, app) {
    const d = dayjs.utc(date).tz(config.timezone);
    const { stockBLL, rzrqBLL } = app.BLL;

    const stocks = await stockBLL.getAll({ where: { rzrq: true }, lean: true });
    for (let i = 0; i < stocks.length; i++) {
      const stock = stocks[i];
      console.log(`rzrq ${stock.se}.${stock.code}`);
      const resp = await fetch(`https://datacenter.eastmoney.com/securities/api/data/get?type=RPT_MARGIN_STATISTICS_STOCKS&sty=SECUCODE%2CSECURITY_CODE%2CSECURITY_NAME_ABBR%2CTRADE_DATE%2CFIN_BALANCE%2CLOAN_BALANCE&filter=(SECUCODE%3D%22${stock.code}.${stock.se.toUpperCase()}%22)&client=APP&source=SECURITIES&st=TRADE_DATE&sr=-1&p=1&ps=30&v=036092416119400006`, {
        headers: {
          'Host': 'datacenter.eastmoney.com',
          'Origin': 'null',
          'Accept': "*/*",
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 color=w eastmoney_ios appversion_9.8.3 pkg=com.eastmoney.iphone mainBagVersion=9.8.3 statusBarHeight=20.000000 titleBarHeight=44.000000 density=3.000000 fontsize=3',
          'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        }
      });
      if (resp.status === 200) {
        const data = await resp.json();
        if (data.code === 0) {
          const result = data.result;
          const dozen = result.data.map(item => ({
            updateOne: {
              filter: { secucode: item.SECUCODE, date: item.TRADE_DATE.split(' ').shift() },
              update: { $setOnInsert: { createdAt: new Date(item.TRADE_DATE), name: item.SECURITY_NAME_ABBR, code: item.SECURITY_CODE, money: item.FIN_BALANCE, stock: item.LOAN_BALANCE } },
              upsert: true,
            }
          }));
          if (dozen.length) {
            const res = await rzrqBLL.model.bulkWrite(dozen);
            console.log(res.upsertedCount)
          }
        }
      }

      let end = d.format('YYYYMMDD'), start = d.subtract(30, 'd').format('YYYYMMDD');
      const url = `https://q.stock.sohu.com/hisHq?code=cn_${stock.code}&start=${start}&end=${end}&stat=1&order=D&period=d&r=0.6419559548876292&0.5151080268175788`;
      const resp2 = await fetch(url);
      if (resp2 && resp2.status === 200) {
        const body = await resp2.json();
        const data = body[0].hq;
        len = data.length;
        const dozen = data.map(item => ({
          updateOne: {
            filter: { secucode: `${stock.code}.${stock.se}`, code: `${stock.code}`, date: item[0] },
            update: { $set: { start: item[1], end: item[2], range: parseFloat(item[4].replace('%', '')), lower: item[5], high: item[6], stocks: item[7] * 100, turnover: item[8], turnover_rate: parseFloat(item[9].replace('%', '')) } }
          }
        }));
        if (dozen.length) {
          const result = await rzrqBLL.model.bulkWrite(dozen);
          if (result.matchedCount !== dozen.length) {
            console.log('less');
          }
        }
      } else {
        console.log('fail');
      }
    }
  },
}