import React from 'react';

import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

// import * as authActions from '../../actions/authAction';
import './Published.less';

export default class Published extends React.Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		return (
			<div className="published">
				<div className="title">
					已发布项目
				</div>
			</div>
		);
	}
}