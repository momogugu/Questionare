import mongoose, {
	Schema
} from 'mongoose';

const Projectschema = new Schema({
	title: String,
	description: String,
	deadline: Date,
	questions: Array,
	userID: String,
	isDeleted: {
		type: Boolean,
		default: false
	},
	status: {
		type: String,
		default: '待发布'
	},
	views: {
		type: Number,
		default: 0
	}
});

export default mongoose.model('Project', Projectschema);