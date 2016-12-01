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
		return ProjectModel.remove(query).exec();
	},
	updateProject(query) {
        return ProjectModel
            .update({
                _id: query._id
            }, query)
            .exec();
    }
}

export default Project;