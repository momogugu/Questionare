import React from 'react';
import {
	Link
} from 'react-router'
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import * as authActions from '../../actions/authAction';
import './User.less';
import '../../static/font/css/fontello.css';

@connect (
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

export default class User extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.authActions.userInit(() => {
			this.context.router.push('/auth/login');
		});
	}
	render() {
		return (
			<div className="user clearfix">
				<div className="left">
					<div className="level">
						<img className="avatar" src={require('../../static/img/avatar.png')} />
						<div className="userName">{this.props.auth.user.name}</div>
						<div className="level-content">
							活跃度：{this.props.auth.user.level || 0}
						</div>
					</div>
					<div className="nav">
						<Link activeClassName="active" className="item" to="/user/setting">
							<i className="icon-cog-outline"></i>个人信息设置
						</Link>
						<Link activeClassName="active" className="item" to="/user/project">
							<i className="icon-pencil"></i>问卷管理
						</Link>
						<Link activeClassName="active" className="item" to="/user/published">
							<i className="icon-spin3"></i>已发布问卷
						</Link>
					</div>
				</div>
				<div className="right">
					<div className="achieve">
					</div>
					<div className="content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}