import server from '../server';
import mongoConnection from './connection';

(async() => {
	try {
		await mongoConnection();
		console.log('连接数据库');
	} catch(err) {
		console.log('ERROR', err);
		return;
	}
	server.listen(3000, '127.0.0.1', () => {
		console.log('server listen 3000');
	});
})();