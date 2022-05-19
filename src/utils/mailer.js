const _ = require('lodash');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

class EmailHelper {
  /**
   * 初始化email
   * @param {object} cfg 参数有host/port/user/pass
   */
  constructor(cfg) {
    this.config = cfg;
    // 开启一个SMTP连接池
    this.transport = nodemailer.createTransport(smtpTransport({
      secure: true,// 使用SSL
      secureConnection: true,// 使用SSL
      host: this.config.host,
      port: this.config.port,
      auth: {
        user: this.config.user,
        pass: this.config.pass
      }
    }));
  }
  render(filename, data) {
    //TODO: 模板渲染_
    return '';
  }
  async sendMail(users, subject, html) {
    // 设置邮件内容
    const options = {
      from: `${this.config.name} <${this.config.user}>`,
      subject,
      html
    };
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      // 发送邮件
      await this.transport.sendMail(_.extend(options, {
        to: `${user.name} <${user.email}>`
      }), function (error, res) {
        if (error) {
          console.log(error);
        } else {
          console.log(res);
        }
      });
    }
  }
}
module.exports = EmailHelper;