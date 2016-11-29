import React from 'react';
import {
	connect
} from "react-redux";
import {
	bindActionCreators
} from "redux";
import {
	Form,
	Button,
	Input
} from "antd";

import * as authActions from '../../actions/authAction';
import './Login.less';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
	return false;
}

@connect (
	state => {
		return ({
			auth: state.auth
		});
	}
)

class Login extends React.Component {
	static contextTypes = {
        router: React.PropTypes.object
    }
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
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				return;
			}
			this.authActions.login(values, () => {
                this.context.router.push('/');
            });
		});
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		const emailProps = getFieldDecorator('email', {
			validate: [{
				rules: [{
					required: true,
					message: 'Please input your E-mail!'
				}],
				trigger: 'onBlur'
			}, {
				rules: [{
					type: 'email',
					message: 'The input is not valid E-mail!'
				}],
				trigger: ['onBlur', 'onChange']
			}]
		});
		const passwordProps = getFieldDecorator('password', {
			rules: [{
				required: true,
				whitespace: true,
				message: 'Please input your password!'
			}, {
			validator: true
			}]
		});
		const formItemLayout = {
			labelCol: {
				span: 7
			},
			wrapperCol: {
				span: 12
			}
		};

		return (
			<Form horizontal className="register">
				<div className="title">账号登录</div>
				<FormItem
					{...formItemLayout}
					label="邮箱"
					hasFeedback
				>
					{emailProps(
						<Input type="email" autoComplete="off" />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="密码"
					hasFeedback
				>
					{passwordProps(
						<Input type="password" autoComplete="off" 
							onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
					)}
				</FormItem>
				<FormItem wrapperCol={{span: 12, offset: 7}}>
					<Button type="primary" onClick={this.handleSubmit}>登录</Button>
				</FormItem>
			</Form>
		);
	}
}

export default createForm()(Login);