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
} from '../constants/authTypes';
import ajax from './apiAction.js';

import tokenDecode from 'jwt-decode';
import {
	message
} from 'antd';

function decodeUser(token) {
	return tokenDecode(token);
}

export function logout() {
	window.localStorage.clear();
	return {
		type: AUTH_LOGOUT
	};
}

export function init(callback) {
	return {
		types: [AUTH_INIT_REQUEST, AUTH_INIT_SUCCESS, AUTH_INIT_FAILURE],
		promise() {
			const token = localStorage.getItem('jwt');
			if (!token) {
				return Promise.resolve({
					data: {
						error: 'no login'
					}
				});
			}
			return ajax({
				url: '/valid',
				method: 'GET',
				headers: {
					'x-access-token': token
				}
			});
 		},
 		after() {
 			if (typeof callback === 'function') {
 				callback();
 			}
 		},
 		onData(result) {
 			const {
 				token,
 				error,
 				success
 			} = result.data;
 			if (token) {
 				return {
 					success,
 					user: decodeUser(token).user
 				};
 			}
 			return {
 				error
 			};
 		},
 		onError(error) {
 			const err = error.data.error || "初始化失败——网络好像出了问题";
 			return err;
 		}
	};
}

export function userInit(callback) {
	return {
		types: [USER_INIT_REQUEST, USER_INIT_SUCCESS, USER_INIT_FAILURE],
		promise() {
			const token = localStorage.getItem('jwt');
			if (!token) {
				return Promise.reject({
					data: {
						error: 'no login'
					}
				});
			}
			return ajax({
				url: '/valid',
				method: 'GET',
				headers: {
					'x-access-token': token
				}
			});
 		},
 		onData(result) {
 			const {
 				token,
 				error,
 				success
 			} = result.data;
 			if (token) {
 				return {
 					success,
 					user: decodeUser(token).user
 				};
 			}
 			return {
 				error
 			};
 		},
 		onError(error) {
 			const err = error.data.error;
 			message.error(err);
 			callback();
 			return err;
 		}
	};
}

export function login(data, callback) {
	return {
		types: [AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
		promise() {
			return ajax({
				url: '/login',
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
				token,
				success,
			} = result.data;
			message.success(success);
			const {
				user 
			}= decodeUser(token);
			try {
				localStorage.setItem('jwt', token);
				return {
					success,
					user: user
				};
			} catch(e) {
				console.log(e);
				message.error('token decode error');
				return Promise.reject({
					data: {
						error: '登录失败，请重新尝试！'
					}
				});
			}
		},
		onError(error) {
			const err = error.data.error;
			message.error(err);
			return err;
		}
	};
}

export function register(data, callback) {
	return {
		types: [AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_SUCCESS],
		promise() {
			return ajax({
				url: '/register',
				method:'POST',
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
	};
}

export function setInfo(data, callback) {
	return {
		types: [AUTH_SETTING_REQUEST, AUTH_SETTING_SUCCESS, AUTH_SETTING_FAILURE],
		promise() {
			return ajax({
				url: '/setting',
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
				token,
				success
			} = result.data;
			message.success(success);
			const {
				user 
			}= decodeUser(token);
			localStorage.setItem('jwt', token);
			return {
				success,
				user: user
			};
		},
		onError(error) {
			const err = error.data.error;
			message.error(err);
			return err;
		}
	}
}