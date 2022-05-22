const schedule = require('node-schedule');
const testJob = require('./jobs/test')
const pneumoniaJob = require('./jobs/pneumonia')
const stockJob = require('./jobs/stock')

module.exports = function (app) {
  const schedules = {
    tasks: {},
    jobs: {},
    getJob(name) {
      return this.jobs[name] || null;
    },
    createJob(job) {
      this.tasks[job.name] = job;
      this.jobs[job.name] = schedule.scheduleJob({rule: job.rule, tz: 'Asia/Shanghai'}, function (date) {
        job.tick && job.tick(date, app);
      })
    },
    tick(name) {
      const task = this.tasks[name];
      if (task) {
        task.tick && task.tick(new Date(), app);
      }
    }
  }
  // schedules.createJob(testJob);
  schedules.createJob(pneumoniaJob);
  schedules.createJob(stockJob);
  return schedules;
}