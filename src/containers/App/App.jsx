import React from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import * as authActions from '../../actions/authAction';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import './App.less';

@connect(
	state => {
		return ({
			auth: state.auth
		});
	},
	dispatch => {
		return ({
			authActions: bindActionCreators(authActions, dispatch)
		});
	}
)

export default class App extends React.Component {
	componentDidMount() {
		this.props.authActions.init();
	}
	render() {
		return (
			<div className="app-content">
				<Header user={this.props.auth.user}
					logout={this.props.authActions.logout} />
				<div className="container">
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}