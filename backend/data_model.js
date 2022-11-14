const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'VesselCare',
	password: 'future',
	port: 5432,
})

const getData = () => {
	return new Promise((resolve, reject) => {
		pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
			if(error) {
				reject(error);
			}
			console.log(error, results);
			resolve(results.rows);
		})
	})
}


module.exports = {
	getData,
}