import {
	PUBLISH_PROJECT_REQUEST,
    PUBLISH_PROJECT_SUCCESS,
    PUBLISH_PROJECT_FAILURE,
	GET_PROJECTS_REQUEST,
	GET_PROJECTS_SUCCESS,
	GET_PROJECTS_FALIURE
} from '../constants/projectTypes.js';
import ajax from './apiAction.js';
import {
	message
} from 'antd';

export function publish(data, callback) {
	return {
		types: [PUBLISH_PROJECT_REQUEST, PUBLISH_PROJECT_SUCCESS, PUBLISH_PROJECT_FAILURE],
		promise() {
			console.log(data)
			return ajax({
				url: '/publish',
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