import ProjectModel from './schema/project.js';

const Project = {
	getProjects(query) {
		return ProjectModel.find(query).exec();
	},
	getProject(id) {
		const query = {
			_id: id
		};
		return ProjectModel.findOne(query).exec();
	},
	async createProject(body) {
		return await new ProjectModel(body).save();
	},
	deleteProject(id) {
		const query = {
			_id: id
		};
		return ProjectModel.update(query, {
			$set: {
				isDeleted: true,
				status: '已删除'
			}
		}).exec();
	}
}

export default Project;