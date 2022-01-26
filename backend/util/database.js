const mysql = require('mysql2')

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'SUPERSECRET123456!',
	database: 'users'
})

module.exports = pool.promise();

// const conn = mysql.createPool({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'SUPERSECRET123456!',
// 	database: 'users'
// })

// module.exports = conn;