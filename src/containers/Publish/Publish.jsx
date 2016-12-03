import React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {
    Form,
    Collapse,
    Radio,
    Button,
    Input,
    Checkbox,
    DatePicker,
    message,
    Icon
} from 'antd';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import enUS from 'antd/lib/date-picker/locale/en_US';
import moment from 'moment';

import * as authActions from '../../actions/authAction';
import * as projectActions from '../../actions/projectAction';
import 'particles.js';
import './Publish.less';

const createForm = Form.create;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
let uuid = 0;

@connect (
    state => {
        return ({
            auth: state.auth,
            project: state.project
        });
    },
    dispatch => {
        return ({
            projectActions: bindActionCreators(projectActions, dispatch),
            authActions: bindActionCreators(authActions, dispatch)
        });
    }
)
class Publish extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
	constructor(props) {
        super(props);
        this.disabledDate = this.disabledDate.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            questions: []
        };
    }
    componentWillMount() {
        this.props.form.setFieldsValue({
            keys: [0],
        });
    }
    componentDidMount() {
        this.loadParticles();
        this.props.authActions.userInit(() => {
            this.context.router.push('/auth/login');
        });
    }
    loadParticles() {
        particlesJS("particles", {
            "particles": {
                "number": {
                    "value": 88,
                    "density": {
                        "enable": true,
                        "value_area": 700
                    }
                },
                "color": {
                    "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 15
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1.5,
                        "opacity_min": 0.15,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2.5,
                    "random": false,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.15,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 110,
                    "color": "#33b1f8",
                    "opacity": 0.25,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": false,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }
    add = () => {
        uuid++;
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    disabledDate(current) {
        return current && current.valueOf() < Date.now();
    }
    handleQuestion(e) {
        const keys = this.props.form.getFieldValue('keys');
        const items = [];
        keys.map((k, i) => {
            items.push(this.props.form.getFieldValue(`names-${k}`));
            // this.props.form.resetFields(`names-${k}`);
        });
        this.props.form.validateFields(['type', 'label', 'necessary'],(errors, values) => {
            if (!!errors) {
                return;
            }
            const type = values.type;
            const label = values.label;
            const necessary = values.necessary;
            const question = {
                type: type,
                label: label,
                necessary: necessary,
                items: items
            }
            const questions = this.state.questions;
            this.setState({
                questions: questions.concat(question)
            });
            this.props.form.resetFields(['type', 'label', 'necessary']);
        });
    }
    handleSave(e) {
        this.props.form.validateFields(['title', 'description', 'deadline'],(errors, values) => {
            if (!!errors) {
                return;
            }
            if (this.state.questions.length) {
                this.props.projectActions.publish(Object.assign({}, {
                    title: values.title,
                    description: values.description,
                    deadline: values.deadline,
                    questions: this.state.questions,
                    userID: this.props.auth.user._id
                }), () => {
                    this.context.router.push('/user/projects');
                });
                return;
            }
            message.error('请添加问卷题！');
            return;
        });
    }
	render() {
        const questions = this.state.questions.map((question, i) => {
            return (
                <div key={i}>
                    {question.type === 'radio'? (
                        <div>
                            <label>{(i+1)+'.'+question.label}</label><br/>
                            <RadioGroup>
                                {question.items.map((item, i) => 
                                    <Radio key={i} value={item}>{item}</Radio>
                                )}
                            </RadioGroup>
                        </div>
                        ):(question.type === 'checkbox' ? (
                            <div>
                                <label>{(i+1)+'.'+question.label}</label><br/>
                                <CheckboxGroup options={question.items} />
                            </div>
                            ): (
                                <div>
                                    <label>{(i+1)+'.'+question.label}</label><br/>
                                    <Input type="textarea" />
                                </div>
                            ))}
                </div>
            );
        });
        const dateFormat = 'YYY/MM/DD';
        const {
            getFieldDecorator,
            getFieldValue
        } = this.props.form;
        const titleProps = getFieldDecorator('title', {
            rules: [{
                required: true,
                message: 'Please input your questionare title!'
            }]
        });
        const descriptionProps = getFieldDecorator('description', {
            rules: [{
                required: true,
                message: 'Please input your questionare description!'
            }]
        });
        const deadlineProps = getFieldDecorator('deadline', {
            initialValue: moment().locale('en').utcOffset(0),
            rules: [{
                type: 'object',
                required: true,
                message: 'Please choose your deadline!'
            }]
        });
        const typeProps = getFieldDecorator('type', {
            rules: [{
                required: true,
                message: 'Please choose your question type!'
            }]
        });
        const necessaryProps = getFieldDecorator('necessary', {
            rules: [{
                required: true,
                message: 'Is this question required!'
            }]
        });
        const labelProps = getFieldDecorator('label', {
            rules: [{
                required: true,
                message: 'Please Input your question!'
            }]
        });
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 14
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: { span: 20, offset: 4 },
        };
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
          return (
            <FormItem
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'items' : ''}
              required={false}
              key={k}
            >
              {getFieldDecorator(`names-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input your items or delete this field.",
                }],
              })(
                <Input placeholder="one of your items" style={{ width: '60%', marginRight: 8 }} />
              )}
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            </FormItem>
          );
        });
		return (
			<div className='auth'>
				<div id="particles"></div>
                <div className="publishProject">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="问卷标题"
                        hasFeedback
                    >
                    {titleProps(<Input type="textarea" autosize />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="详细介绍"
                        hasFeedback
                    >
                    {descriptionProps(<Input type="textarea" rows={4} />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="截止日期"
                    >
                        {deadlineProps(<DatePicker disabledDate={this.disabledDate}
                            locale={enUS} />)}
                    </FormItem>
                    <Collapse style={{marginTop: '30px'}}>
                        <Panel header="添加问题">
                            <FormItem
                                {...formItemLayout}
                                label="题目类型"
                                hasFeedback
                            >
                                {typeProps(<RadioGroup>
                                    <Radio value="radio">单选框</Radio>
                                    <Radio value="checkbox">多选框</Radio>
                                    <Radio value="textarea">文本域</Radio>
                                </RadioGroup>)}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="是否必填"
                                hasFeedback
                            >
                                {necessaryProps(<RadioGroup>
                                    <Radio value="true">必填</Radio>
                                    <Radio value="false">选填</Radio>
                                </RadioGroup>)}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="问卷题目"
                                hasFeedback
                            >
                                {labelProps(<Input type="textarea" autosize/>)}
                            </FormItem>
                            {getFieldValue('type') === 'textarea' ? console.log('textarea') : formItems}
                            {getFieldValue('type') === 'textarea' ? console.log('textarea') : (<FormItem {...formItemLayoutWithOutLabel}>
                              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                <Icon type="plus" /> Add
                              </Button>
                            </FormItem>)}
                            <FormItem
                                wrapperCol={{span: 8, offset: 4}}>
                                <Button onClick={this.handleQuestion} type="primary">新建问题</Button>
                            </FormItem>
                        </Panel>
                    </Collapse>
                    <ReactCSSTransitionGroup transitionName="example">
                        {questions}
                    </ReactCSSTransitionGroup>
                    <FormItem style={{marginTop: '30px'}} wrapperCol={{span: 8, offset: 2}}>
                        <Button style={{marginRight: '20px'}} onClick={this.handleSave} type="primary">保存问卷</Button>
                    </FormItem>
                    </Form>
                </div>
			</div>
		);
	}
}

export default createForm({})(Publish);