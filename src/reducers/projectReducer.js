import {
	PUBLISH_PROJECT_REQUEST,
    PUBLISH_PROJECT_SUCCESS,
    PUBLISH_PROJECT_FAILURE,
	GET_PROJECTS_REQUEST,
	GET_PROJECTS_SUCCESS,
	GET_PROJECTS_FAILURE
} from '../constants/projectTypes.js';

const initialState = {
	projects: [],
	detailProject: [],
	publishedProject: []
};

export default function project(state = initialState, actions = {}) {
	const {
		type,
		result,
		error
	} = actions;
	switch(type) {
		case PUBLISH_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				error: '',
				success: result.success,
				projects: [
					...state.projects,
					result.project
				]
			};
		case GET_PROJECTS_SUCCESS: 
			return {
				...state,
				loading: false,
				error: '',
				success: result.success,
				projects: result.project,
				publishedProject: result.publishedProject
			}
		case GET_PROJECTS_REQUEST:
		case PUBLISH_PROJECT_REQUEST:
			return {
				...state,
				loading: true
			}
		case GET_PROJECTS_FAILURE:
		case PUBLISH_PROJECT_FAILURE:
			return {
				...state,
				loading: false,
				error: error,
				success: ''
			}
		default:
			return state;
	}
}