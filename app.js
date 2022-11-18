//載入Routes檔案
const routes = require('./routes');
// DB連線
require('./connection');

const app = async (req, res) => {
  routes(req, res);
}

module.exports = app;
