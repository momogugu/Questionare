import React from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Form,
	Input,
	Button
} from 'antd';

import * as authActions from '../../actions/authAction';
import './Setting.less';

const createForm = Form.create;
const FormItem = Form.Item;

@connect(
	state => ({
		auth: state.auth
	})
)

class Setting extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		const {
			dispatch
		} = this.props;
		this.authActions = bindActionCreators(authActions, dispatch);
	}
	handleSubmit() {
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				return;
			}
			this.authActions.setInfo(Object.assign({}, values, {
				_id: this.props.auth.user._id
			}));
		});
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 14
			}
		};
		const nameProps = getFieldDecorator('name', {
			initialValue: this.props.auth.user.name,
			rules: [{
				required: true,
				message: 'Please enter your nickname!'
			}]
		});
		const introProps = getFieldDecorator('intro', {
			initialValue: this.props.auth.user.intro,
			rules: [{
				required: true,
				message: 'Introduce yourself briefly.'
			}]
		});
		return (
			<Form horizontal className="publish">
				<FormItem 
					{...formItemLayout}
					label="邮箱"
					hasFeedback
					required
				>
					<Input autoComplete="off" value={this.props.auth.user.email} disabled />
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="用户名"
					hasFeedback
					required
				>
					{nameProps(<Input autoComplete="off" />)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="简介"
					hasFeedback
					required
				>
					{introProps(<Input autoComplete="off" />)}
				</FormItem>
				<FormItem wrapperCol={{span: 18, offset: 6}}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                </FormItem>
			</Form>
		);
	}
}

export default createForm()(Setting);