import mysql from 'mysql2/promise';

export default mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Trybesmith',
  // Referência: https://stackoverflow.com/questions/32100434/mysql-returns-full-datetime-string-on-select-query-when-column-type-is-date
  dateStrings: true,
});