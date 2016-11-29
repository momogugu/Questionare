import React from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Button,
	Form,
	Input
} from 'antd';

import * as authActions from '../../actions/authAction';
import './Register.less';

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

class Register extends React.Component {
	static contextTypes = {
        router: React.PropTypes.object
    }
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.checkPass = this.checkPass.bind(this);
		this.reCheckPass = this.reCheckPass.bind(this);
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
			this.authActions.register(values, () => {
				this.context.router.push('/auth/login');
			})
		})
	}
	handleReset(e) {
		e.preventDefault();
		this.props.form.resetFields();
	}
	checkPass(rule, value, callback) {
		const {
            validateFields
        } = this.props.form;
	    if (value) {
	      validateFields(['rePassword'], { force: true });
	    }
	    callback();
	}
	reCheckPass(rule, value, callback) {
		const {
            getFieldValue
        } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
	}
	render() {
		const {
			getFieldDecorator,
			getFieldError,
			isFieldValidating
		} = this.props.form;
		const nameProps = getFieldDecorator('name', {
			rules: [{
				required: true,
				min: 5
			}]
		});
		const emailProps = getFieldDecorator('email', {
			validate: [{
				rules: [{
					required: true,
					message: 'Please input your E-mail!'
				}],
				trigger: 'onBlur'
			},{
				rules: [{
					type: 'email',
					message: 'The input is not valid E-mail!'
				}],
				trigger: ['onBlur', 'onChange'] 
			}]
		});
		const passwdProps = getFieldDecorator('password', {
			rules: [{
				required: true,
				whitespace: true,
				min: 8
			}, {
				validator: this.checkPass
			}]
		});
		const repasswdProps = getFieldDecorator('rePassword', {
			rules: [{
				required: true,
				whitespace: true,
				min: 8,
				message: 'Please reinput your password!'
			}, {
				validator: this.reCheckPass
			}]
		})
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
				<div className="title">账号注册</div>
				<FormItem 
					{...formItemLayout}
					label="name"
					hasFeedback
					help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
				>
					{nameProps(
						<Input autoComplete="off" placeholder='Please enter your name, at least 5 words!' />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="邮箱"
					hasFeedback
				>
					{emailProps(
						<Input type="email" autoComplete="off" placeholder="Please enter your email!"/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="密码"
					hasFeedback
				>
					{passwdProps(
						<Input type="password" autoComplete="off" placeholder="Please enter your password!"
							onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="确认密码"
					hasFeedback
				>
					{repasswdProps(
						<Input type="password" autoComplete="off" placeholder="Please confirm your password!"
							onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
					)}
				</FormItem>
				<FormItem wrapperCol={{span: 12, offset: 7}}>
					<Button type="primary" onClick={this.handleSubmit}>注册</Button>
					<Button type="ghost" onClick={this.handleReset}>重置</Button>
				</FormItem>
			</Form>
		);
	}
}

export default createForm({})(Register);