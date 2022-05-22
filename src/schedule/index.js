const schedule = require('node-schedule');
const config = require('../config/index')
const testJob = require('./jobs/test')
const pneumoniaJob = require('./jobs/pneumonia')
const stockJob = require('./jobs/stock')
const lovedailyJob = require('./jobs/lovedaily')

module.exports = function (app) {
  const schedules = {
    tasks: {},
    jobs: {},
    getJob(name) {
      return this.jobs[name] || null;
    },
    createJob(job) {
      this.tasks[job.name] = job;
      this.jobs[job.name] = schedule.scheduleJob({ rule: job.rule, tz: config.timezone }, function (date) {
        job.tick && job.tick(date, app);
      })
    },
    tick(name) {
      const task = this.tasks[name];
      if (task) {
        task.tick && task.tick(new Date(), app);
      } else {
        console.log(`schedule ${name} not found!`)
      }
    }
  }
  // schedules.createJob(testJob);
  schedules.createJob(pneumoniaJob);
  schedules.createJob(stockJob);
  // schedules.createJob(lovedailyJob);
  return schedules;
}