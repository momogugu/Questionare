import ProjectModel from './schema/project.js';

const Project = {
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