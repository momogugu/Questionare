import {
	AUTH_INIT_REQUEST,
	AUTH_INIT_SUCCESS,
	AUTH_INIT_FAILURE,
	USER_INIT_REQUEST,
	USER_INIT_SUCCESS,
	USER_INIT_FAILURE,
	AUTH_LOGOUT,
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAILURE,
	AUTH_REGISTER_REQUEST,
	AUTH_REGISTER_SUCCESS,
	AUTH_REGISTER_FAILURE,
	AUTH_SETTING_REQUEST,
	AUTH_SETTING_SUCCESS,
	AUTH_SETTING_FAILURE
} from '../constants/authTypes.js';

const initialState = {
	user: {
		name: '',
		_id: ''
	}
};

export default function auth(state = initialState, actions = {}) {
	const {
		type,
		result,
		error
	} = actions;
	switch(type) {
		case AUTH_LOGOUT: 
			return {
				...state,
				success: '成功退出',
				error: '',
				logined: false,
				user: {}
			}
		case AUTH_INIT_SUCCESS:
			return {
				...state,
				success: result.success,
				error: result.error,
				logined: result.user ? true : false,
				user: result.user || {}
			};
		case USER_INIT_SUCCESS:
		case AUTH_LOGIN_SUCCESS:
		case AUTH_SETTING_SUCCESS:
			return {
				...state,
				loading: false,
				error: result.error,
				logined: true,
				success: result.success,
				user: result.user
			};
		case AUTH_REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				error: '',
				success: result.success
			};
		case AUTH_INIT_REQUEST:
		case USER_INIT_REQUEST:
		case AUTH_LOGIN_REQUEST:
		case AUTH_REGISTER_REQUEST:
		case AUTH_SETTING_REQUEST:
			return {
				...state,
				loading: true
			};
		case AUTH_INIT_FAILURE:
		case USER_INIT_FAILURE:
		case AUTH_LOGIN_FAILURE:
		case AUTH_REGISTER_FAILURE:
		case AUTH_SETTING_FAILURE:
			return {
				...state,
				loading: false,
				error: error,
				success: ''
			};
		default:
			return state;
	}
}