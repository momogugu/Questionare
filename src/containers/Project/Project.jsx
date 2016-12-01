import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Form,
	Radio,
	Checkbox,
	Input,
	Button,
	message
} from 'antd';

import * as projectActions from '../../actions/projectAction';
import './Project.less';

const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@connect(
	state => {
		return ({
			auth: state.auth,
			project: state.project
		});
	},
	dispatch => {
		return ({
			projectActions: bindActionCreators(projectActions, dispatch)
		});
	}
)

class Project extends React.Component {
	static contextTypes = {
        router: React.PropTypes.object
    }
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		const {
			_id
		} = this.props.params;
		this.props.projectActions.getProject(_id);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				return;
			}
			message.success('问卷提交成功');
			this.context.router.push('/');
		})
	}
	render() {
		const {
			detailProject
		} = this.props.project;
		const date = new Date(detailProject.deadline);
		const questions = detailProject.questions || [];
		const {
			getFieldDecorator
		} = this.props.form;
		const formItemLayout = {
			labelCol: {
				span: 7
			},
			wrapperCol: {
				span: 12
			}
		};
		return (
			<div className="project clearfix">
				<div className="left">
					<div className="title-container">
						<div className="title-row">
							<span className="title">{detailProject.title}</span>
							<span className="status"><i className="icon-eye"/>{detailProject.views}</span>
							<span className="status"><i className="icon-pencil"/>0</span>
							<div className="desc-row">
								{detailProject.description}
							</div>
							<div className="detail-row clearfix">
								<div className="detail-span">
	                                <span className="name">截止日期</span>{date.toLocaleDateString()}
	                            </div>
							</div>
						</div>
					</div>
					<div className="content-container">
						<Form horizontal>
							{questions.map((question, i) => {
					            return (
					                <div key={i}>
					                	{question.type === 'radio'? (
					                        <FormItem
					                        	{...formItemLayout}
					                        	label={(i+1)+'.'+question.label}
					                        	hasFeedback
					                        >
					                            {getFieldDecorator(question.label, {
					                            	rules: [{
					                            		required: question.necessary,
					                            		message: 'Please choose your answer!'
					                            	}]
					                            })(<RadioGroup>
					                                {question.items.map((item, i) => 
					                                    <Radio key={i} value={item}>{item}</Radio>
					                                )}
					                            </RadioGroup>)}
					                        </FormItem>
					                    ):(question.type === 'checkbox' ? (
					                        <FormItem
					                            {...formItemLayout}
					                            label={(i+1)+'.'+question.label} 
					                            hasFeedback
					                        >
					                            {getFieldDecorator(question.label, {
					                            	rules: [{
					                            		required: question.necessary
					                            	}]
					                            })(<CheckboxGroup options={question.items} />)}
					                        </FormItem>
					                    ): (<FormItem
					                            {...formItemLayout}
					                            label={(i+1)+'.'+question.label}
					                            hasFeedback
					                        >
					                            {getFieldDecorator('textarea', {
													rules: [{
														required: question.necessary,
														min: 10,
														message: 'Please input more than 10 words!'
													}]
												})(<Input type="textarea" />)}
					                        </FormItem>
					                    ))} 
					                </div>
					            );
					        })}
					        <FormItem
					        	wrapperCol={{span: 12, offset: 7}}
					        >
					        	<Button type="primary" onClick={this.handleSubmit}>提交问卷</Button>
					        </FormItem>
						</Form>
					</div>
				</div>
				<div className="right">
					<div className="relative">
                        <div className="title">相关项目</div>
                        {[1, 2, 3, 4, 5].map(item =>
                            <div className="list clearfix" key={item}>
                                <Link to='/' className=''>这里是相关项目项目</Link>
                            </div>
                        )}
                        <Link to='/' className='more'>more&gt;&gt;</Link>
                    </div>
                    <div className="recommend">
                        <div className="title">推荐项目</div>
                        {[1, 2, 3, 4, 5].map(item =>
                            <div className="list clearfix" key={item}>
                                <Link to='/' className=''>这里是推荐项目项目</Link>
                            </div>
                        )}
                        <Link to='/' className='more'>more&gt;&gt;</Link>
                    </div>
				</div>
			</div>
		);
	}
}
export default createForm({})(Project);