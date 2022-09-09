const { url } = require('./blog.config');

module.exports = {
  siteUrl: url,
  generateRobotsTxt: true, // default: false, true 라고 설정해야 robots.txt 생성
  sitemapSize: 7000,
};
