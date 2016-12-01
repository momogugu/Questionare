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
	pagination,
	message
} from 'antd';

import * as projectActions from '../../actions/projectAction';
import './Projects.less';

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
	componentDidMount() {
		this.props.projectActions.getProjects({
			userID: this.props.auth.user._id
		});
	}
	handleAdd(e) {
		e.preventDefault();
		this.context.router.push('/publish');
	}
	handleCheck(status, e){
		if (status === "待发布") {
			message.error("问卷尚未发布");
			return;
		}
	}
	handlePublish(id, status, e){
		if (status === "待发布") {
			e.preventDefault();
	        const value = {
	            _id: id,
	            status: "已发布"
	        };
			this.props.projectActions.updateProject(value);
			return;
		} else {
			message.error('问卷已发布');
			return;
		}
	}
	handleDelete(id, e) {
		const value = {
			_id: id
		};
		this.props.projectActions.deleteProject(value);
	}
	render() {
		let {
			projects
		} = this.props.project;
		// console.log(projects);
		projects = projects || [];
		const data = [];
		projects.map((project, i) => {
			data.unshift({
                key: projects[i]._id,
                _id: projects[i]._id,
                title: projects[i].title,
                time: (new Date(projects[i].deadline)).toLocaleDateString(),
                status: projects[i].status
            });
		});
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
            title: '查看统计结果',
            dataIndex: 'lookData',
            render: (text, record) => (<a href="#" onClick={this.handleCheck.bind(this, record.status)}>查看统计结果</a>)
        },{
			title: '操作',
			dataIndex: 'operation',
			render: (text, record) => (
				<span>
					<a href="#">编辑问卷</a>
					<span className="ant-divider"></span>
					<a href="#" onClick={this.handleDelete.bind(this, record._id)}>删除问卷</a>
					<span className="ant-divider"></span>
					<a href="#" onClick={this.handlePublish.bind(this, record._id, record.status)}>发布问卷</a>
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