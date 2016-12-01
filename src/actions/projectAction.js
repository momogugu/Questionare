import {
	PUBLISH_PROJECT_REQUEST,
    PUBLISH_PROJECT_SUCCESS,
    PUBLISH_PROJECT_FAILURE,
	GET_PROJECTS_REQUEST,
	GET_PROJECTS_SUCCESS,
	GET_PROJECTS_FALIURE,
	GET_PROJECT_REQUEST,
	GET_PROJECT_SUCCESS,
	GET_PROJECT_FALIURE,
	UPDATE_PROJECT_REQUEST,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_PROJECT_FAILURE,
	DELETE_PROJECT_REQUEST,
	DELETE_PROJECT_SUCCESS,
	DELETE_PROJECT_FAILURE
} from '../constants/projectTypes.js';
import ajax from './apiAction.js';
import {
	message
} from 'antd';

export function publish(data, callback) {
	return {
		types: [PUBLISH_PROJECT_REQUEST, PUBLISH_PROJECT_SUCCESS, PUBLISH_PROJECT_FAILURE],
		promise() {
			return ajax({
				url: '/projects',
				method: 'POST',
				data: data
			});
		},
		after() {
			if (typeof callback === 'function') {
				callback();
			}
		},
		onData(result) {
			const {
				success
			} = result.data;
			message.success(success);
			return {
				success
			};
		},
		onError(error) {
			const err = error.data.error;
			message.error(err);
			return err;
		}
	}
}

export function getProjects(data, callback) {
	return {
		types: [GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS, GET_PROJECTS_FALIURE],
		promise() {
			// console.log(data);
			return ajax({
				url: '/projects',
				method: 'GET',
				params: data
			});
		},
		after() {
			if (typeof callback === 'function') {
				callback();
			}
		},
		onData(result) {
			const {
				project,
				publishedProject,
				success
			} = result.data;
			return {
				project,
				publishedProject,
				success
			};
		},
		onError(error) {
			const err = error.data.error;
			message.error(err);
			return err;
		}
	};
}

export function getProject(_id, callback) {
	return {
		types: [GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FALIURE],
		promise() {
			return ajax({
				url: `/project/${_id}`,
				method: 'GET'
			});
		},
		after() {
			if (typeof callback === 'function') {
				callback();
			}
		},
		onData(result) {
			const {
				project,
				success
			} = result.data;
			return {
				project,
				success
			};
		},
		onError(error) {
			const err = error.data.error;
			message.error(err);
			return err;
		}
	};
}

export function updateProject(data, callback) {
	return {
		types: [UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE],
		promise() {
			return ajax({
				url: `/project/${data._id}`,
				method: 'PUT',
				data: data
			});
		},
		after() {
			if (typeof callback === 'function') {
				callback();
			}
		},
		onData(result) {
			const {
				project,
				success
			} = result.data;
			message.success(success);
			return {
				project,
				success
			};
		},
		onError(error) {
			const err = error.data.error;
			message.error(err);
			return err;
		}
	}
}

export function deleteProject(data, callback) {
	return {
		types: [DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE],
		promise() {
			return ajax({
				url: `/project/${data._id}`,
				method: 'DELETE',
				data: data
			});
		},
		after() {
			if (typeof callback === 'function') {
				callback();
			}
		},
		onData(result) {
			const {
				_id,
				success
			} = result.data;
			message.success(success);
			return {
				_id: _id,
				success: success
			};
		},
		onError(error) {
			const err = error.data.error;
			message.error(err);
			return err;
		}
	}
}