import {
	PUBLISH_PROJECT_REQUEST,
    PUBLISH_PROJECT_SUCCESS,
    PUBLISH_PROJECT_FAILURE,
	GET_PROJECTS_REQUEST,
	GET_PROJECTS_SUCCESS,
	GET_PROJECTS_FAILURE,
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
		case GET_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				error: '',
				success: result.success,
				detailProject: result.project
			}
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
		case UPDATE_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				error: '',
				success: result.success,
				projects: state.projects ? state.projects.map(item =>
                    item._id === result.project._id ?
                    Object.assign({}, item, result.project) :
                    item
                ) : [],
                publishedProject: state.publishedProject ? state.publishedProject.map(item =>
                    item._id === result.project._id ?
                    Object.assign({}, item, result.project) :
                    item
                ) : []
			}
		case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                projects: state.projects.filter(item =>
                    item._id !== result._id
                )
            };
		case GET_PROJECT_REQUEST:
		case GET_PROJECTS_REQUEST:
		case PUBLISH_PROJECT_REQUEST:
		case UPDATE_PROJECT_REQUEST:
		case DELETE_PROJECT_REQUEST:
			return {
				...state,
				loading: true
			}
		case GET_PROJECT_FALIURE:
		case GET_PROJECTS_FAILURE:
		case PUBLISH_PROJECT_FAILURE:
		case UPDATE_PROJECT_FAILURE:
		case DELETE_PROJECT_FAILURE:
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