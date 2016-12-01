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
    message
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
        this.handleDate = this.handleDate.bind(this);
        // this.handleTitle = this.handleTitle.bind(this);
        // this.handleDescription = this.handleDescription.bind(this);
        // this.handleType = this.handleType.bind(this);
        // this.handleNecessary = this.handleNecessary.bind(this);
        // this.handleLabel = this.handleLabel.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleItem = this.handleItem.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            questions: [],
            items: [],
            deadline: ''
        }
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
    disabledDate(current) {
        return current && current.valueOf() < Date.now();
    }
    handleDate(date, dateString) {
        this.setState({
            deadline: dateString
        });
    }
    // handleTitle(e) {
    //     let value = e.target.value;
    //     this.setState({
    //         title: value
    //     });
    // }
    // handleDescription(e) {
    //     let value = e.target.value;
    //     this.setState({
    //         description: value
    //     });
    // }
    // handleType(e) {
    //     let value = e.target.value;
    //     this.setState({
    //         type: value
    //     });
    // }
    // handleNecessary(e) {
    //     let value = e.target.value;
    //     this.setState({
    //         necessary: value
    //     });
    // }
    // handleLabel(e) {
    //     let value = e.target.value;
    //     this.setState({
    //         label: value
    //     });
    // }
    handleQuestion(e) {
        this.props.form.validateFields(['type', 'label', 'necessary', 'items'],(errors, values) => {
            if (!!errors) {
                return;
            }
            const type = values.type;
            const label = values.label;
            const necessary = values.necessary;
            const items = this.state.items;
            const question = {
                type: type,
                label: label,
                necessary: necessary,
                items: items
            }
            const questions = this.state.questions;
            this.setState({
                questions: questions.concat(question),
                items: []
            });
            this.props.form.resetFields(['type', 'label', 'necessary', 'items']);
        });
    }
    handleItem(e) {
        let items = this.state.items;
        let str = e.target.value.trim();
        if (/[,，\s\n]+/.test(str) || e.keyCode ===13) {
            if (str.length) {
                var arr = str.split(/,|，|;|；|、|\s|\n|\r|\t/).filter(function (e) {
                    if (e!=null && e.length>0) {
                        return true;
                    } else {
                        return false;
                    } 
                    });
                items = items.concat(arr);
                items = this.delRepeat(items);
                while (items.length > 10) {
                    items.shift(items[0]);
                }
                this.setState({
                    items: items
                });
            } 
        }
    }
    delRepeat(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i]);
            }   
        }
        return newArr;
    }
    handleSave(e) {
        this.props.form.validateFields(['title', 'description'],(errors, values) => {
            if (!!errors) {
                return;
            }
            console.log(this.state.questions.length)
            if (this.state.questions.length) {
                console.log('wew');
                this.props.projectActions.publish(Object.assign({}, {
                    title: values.title,
                    description: values.description,
                    deadline: this.state.deadline,
                    questions: this.state.questions,
                    userID: this.props.auth.user._id
                }), () => {
                    this.setState({
                        questions: [],
                        question: {},
                        label: '',
                        type: 'radio',
                        items: [],
                        necessary: true
                    });
                });
                this.props.form.resetFields();
                return;
            }
            message.error('请输入问卷题！');
            return;
        });
    }
	render() {
        const items = this.state.items.map((item, i) => {
            return (
                <div key={i} className="item">
                    {item}
                </div>
            );
        });
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
            getFieldDecorator
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
        const itemProps = getFieldDecorator('items', {
            rules: [{
                required: true,
                message: "可用空格，逗号，回车来分隔选项"
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
                            <FormItem
                                {...formItemLayout}
                                label="选项"
                                hasFeedback
                            >
                                {itemProps(<Input type="textarea" autosize onBlur={this.handleItem} />)}
                            </FormItem>
                                <ReactCSSTransitionGroup transitionName="example">
                                    {items}
                                </ReactCSSTransitionGroup>
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
                        <Button onClick={this.handleSave} type="ghost">发布问卷</Button>
                    </FormItem>
                    </Form>
                </div>
			</div>
		);
	}
}

export default createForm({})(Publish);