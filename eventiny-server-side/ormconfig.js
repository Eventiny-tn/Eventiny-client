// module.exports = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'eventiny',
//   entities: ['src/**/**.entity{.ts,.js}'],
//   synchronize: true,
// };

const fs = require('fs');
module.exports = {
  type: 'mysql',
  host: 'eventiny-do-user-8651156-0.b.db.ondigitalocean.com',
  port: 25060,
  username: 'doadmin',
  password: 'v4m7nr8xne12o2ds',
  database: 'eventiny',
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  supportBigNumbers: true,
  bigNumberStrings: true,
  charset: 'utf8mb4_unicode_ci',
  ssl: true,
  multipleStatements: true,
  entities: ['src/**/**.entity{.ts,.js}'],
  ssl: {
    ca: fs.readFileSync(__dirname + '/ca-certificate.crt'),
  },
  synchronize: true,
};
