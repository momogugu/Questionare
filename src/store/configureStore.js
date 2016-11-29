import thunkMiddleware from 'redux-thunk'; //异步请求所需中间件
import createLogger from 'redux-logger'; //引入日志中间件logger
import {
    createStore,
    applyMiddleware  //将所有中间件组成一个数组，依次执行
}
from 'redux';
import rootReducer from '../reducers/index';
import createMiddle from '../middleware/index';

const loggerMiddleware = createLogger();
const middle = createMiddle();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, //允许dispatch（）函数
    ...middle,
    loggerMiddleware //打印action日志
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState,
        window.devToolsExtension && window.devToolsExtension()); //chrome插件？
}
