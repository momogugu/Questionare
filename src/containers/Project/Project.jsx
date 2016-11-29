import React from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Button,
	Icon,
	Table,
	pagination
} from 'antd';

import * as projectActions from '../../actions/projectAction';
import './Project.less';

@connect (
	state => ({
		auth: state.auth,
		project: state.project
	}),
	dispatch => ({
		projectActions: bindActionCreators(projectActions, dispatch)
	})
)

export default class Projects extends React.Component {
	static contextTypes = {
        router: React.PropTypes.object
    }
	constructor(props) {
		super(props);
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleAdd(e) {
		e.preventDefault();
		this.context.router.push('/publish');
	}
	render() {
		const {
			projects
		} = this.props.project;
		const data = [];
		// projects = projects || [];
		const pagination = {
			total: data.length,
			showSizeChanger: true,
			onShowSizeChange(current, pageSize) {
				console.log('Current:', current, '; PageSize:', pageSize);
			},
			onChange(current) {
				console.log('Current:', current);
			}
		};
		const columns = [{
			title: '标题',
			dataIndex: 'title',
			key: 'title'
		}, {
			title: '时间',
			dataIndex: 'time',
			key: 'time'
		}, {
			title: '状态',
			dataIndex: 'status',
			key: 'status'
		}, {
			title: '操作',
			dataIndex: 'operation',
			render: (text, record) => (
				<span>
					<a href="#">编辑问卷</a>
					<span className="ant-divider"></span>
					<a href="#">删除问卷</a>
				</span>
			)
		}]
		return (
			<div className="published">
				<div className="title">
					问卷管理
					<Button type="primary" icon="plus-circle" style={{float: 'right'}} onClick={this.handleAdd}>新建问卷</Button>
				</div>
				<Table dataSource={data} pagination={pagination} columns={columns} />
			</div>
		);
	}
}