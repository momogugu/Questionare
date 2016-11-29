import mongoose from 'mongoose';

export default async() => new Promise((resolve, reject) => {
	mongoose.connect('mongodb://localhost/Questionare', (error) => {
		if (error) {
			reject(error.message);
		}
		resolve();
	});
});