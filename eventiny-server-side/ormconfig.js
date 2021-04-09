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
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
};
