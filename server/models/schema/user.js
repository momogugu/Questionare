import mongoose, {
	Schema
} from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		index: true,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		index: {
			unique: true,
			sparse: true
		}
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	intro: {
		type: String
	},
	level: {
		type: Number,
		default: 0
	},
	create_time: Date
});

export default mongoose.model('User', UserSchema);