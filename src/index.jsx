import React from 'react';
import {
    render
} from 'react-dom';
import {
	Provider
} from 'react-redux';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory,
    IndexRedirect
} from 'react-router';

import App from './containers/App/App.jsx';
import Home from './containers/Home/Home.jsx';
import Auth from './containers/Auth/Auth.jsx';
import Login from './containers/Login/Login.jsx';
import Register from './containers/Register/Register.jsx';
import User from './containers/User/User.jsx';
import Setting from './containers/Setting/Setting.jsx';
import Projects from './containers/Projects/Projects.jsx';
import Published from './containers/Published/Published.jsx';
import Publish from './containers/Publish/Publish.jsx';
import Project from './containers/Project/Project.jsx';
import NotFound from './containers/NotFound/NotFound.jsx';

import configureStore from './store/configureStore';

import 'antd/dist/antd.less';

const store = configureStore();

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="auth" component={Auth}>
					<IndexRedirect to='login' />
					<Route path="login" component={Login} />
					<Route path="register" component={Register} />
				</Route>
				<Route path="user" component={User}>
					<IndexRoute component={Setting} />
					<Route path="setting" component={Setting} />
					<Route path="projects" component={Projects} />
					<Route path="published" component={Published} />
				</Route>
				<Route path="publish" component={Publish} />
				<Route path="project/:_id" component={Project} />
				<Route path="*" component={NotFound} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
)