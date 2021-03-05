const blocks = require('./api/blocks');

module.exports = (app) => {
  app.use('/api', blocks);
}