const dayjs = require('../../utils/dayjs')
const fetch = require('node-fetch');
const ejs = require('ejs');
const path = require('path')
const constant = require('../../constant')
const Mailer = require('../../utils/mailer')

async function getSentence() {
  const resp = await fetch(`https://api.shadiao.app/chp`);
  if (resp.status === 200) {
    const body = await resp.json();
    return body.data.text;
  }
  return '';
}

async function getWhether(location_id, key) {
  const resp = await fetch(`https://devapi.qweather.com/v7/weather/3d?location=101210707&key=19f3c3f4694b4b918ff30019b6e2efb3`);
  if (resp.status === 200) {
    const data = await resp.json()
    // data.code === "200"
    const w = data.daily[0]
    return `</br>${w.textDay}, 温度: ${w.tempMin}℃-${w.tempMax}℃, 湿度: ${w.humidity}</br>风向: ${w.windDirDay}, 风力等级: ${w.windScaleDay}`
  }
  return '';
}

async function getWallpaper() {
  const resp = await fetch(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1`)
  if (resp.status === 200) {
    const body = await resp.json();
    return 'https://bing.com' + body.images[0].url
  }
  return '';
}

module.exports = {
  name: 'lovedaily',
  rule: '0 0 22 * * *',
  async tick(date, app) {
    const d = dayjs.utc(date).tz('Asia/Shanghai')
    console.log(this.name, d.format());
    const config = await app.BLL.configBLL.getInfo({ where: { name: 'email' } });
    const config2 = await app.BLL.configBLL.getInfo({ where: { name: 'lovedaily' } });
    if (config2) {
      const sentence = await getSentence();
      const weather = await getWhether(config2.value.location_id, config2.value.key)
      const url = await getWallpaper();
      const mailer = new Mailer(config)
      const attachments = [];
      if (url) {
        // attachments.push({ path: url, cid: '01' })
      }
      const html = await ejs.renderFile(path.join(constant.PATH.SRC, 'templates/email/lovedaily.ejs'), {
        sentence,
        weather,
        url,
        date: `<h3 style="color: #ffd400;" >今天是 ${d.format('YYYY-MM-DD')}</h3>`
      })
      mailer.sendMail([{ name: 'Sophsis', email: '2240844515@qq.com' }], 'demo from max', html, attachments)
    } else {
      console.log('lovedaily config miss')
    }
  },
}