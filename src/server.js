const config = require('./config/index');
const app = require('./app')

app.listen(config.PORT, () => {
  console.log(`app listening at: ${config.PORT}`);
})