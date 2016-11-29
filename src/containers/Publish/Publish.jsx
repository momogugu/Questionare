import React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {
    Collapse,
    Radio,
    Button,
    Input,
    Checkbox,
    DatePicker
} from 'antd';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import enUS from 'antd/lib/date-picker/locale/en_US';
import moment from 'moment';

import * as projectActions from '../../actions/projectAction';
import 'particles.js';
import './Publish.less';

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
            projectActions: bindActionCreators(projectActions, dispatch)
        });
    }
)

export default class Publish extends React.Component {
	constructor(props) {
        super(props);
        this.disabledDate = this.disabledDate.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleNecessary = this.handleNecessary.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleItem = this.handleItem.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            title: '',
            description: '',
            deadline: '',
            questions: [],
            question: {},
            label: '',
            type: 'radio',
            items: [],
            necessary: true
        }
    }
    componentDidMount() {
        this.loadParticles();
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
    handleTitle(e) {
        let value = e.target.value;
        this.setState({
            title: value
        });
    }
    handleDescription(e) {
        let value = e.target.value;
        this.setState({
            description: value
        });
    }
    handleType(e) {
        let value = e.target.value;
        this.setState({
            type: value
        });
    }
    handleNecessary(e) {
        let value = e.target.value;
        this.setState({
            necessary: value
        });
    }
    handleLabel(e) {
        let value = e.target.value;
        this.setState({
            label: value
        });
    }
    handleQuestion(e) {
        const title = this.state.title;
        const description = this.state.description;
        const deadline =  this.state.deadline;
        const type = this.state.type;
        const label = this.state.label;
        const necessary = this.state.necessary;
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
            question: question,
            label: '',
            type: 'radio',
            items: [],
            necessary: true
        })
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
        this.props.projectActions.publish(Object.assign({}, {
            title: this.state.title,
            description: this.state.description,
            deadline: this.state.deadline,
            questions: this.state.questions,
            userID: this.props.auth.user._id
        }), () => {
            this.setState({
                title: '',
                description: '',
                deadline: '',
                questions: [],
                question: {},
                label: '',
                type: 'radio',
                items: [],
                necessary: true
            })
        })
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
		return (
			<div className='auth'>
				<div id="particles"></div>
                <div className="publishProject">
                    <Input type="textarea" placeholder="问卷标题" autosize onChange={this.handleTitle} />
                    <div style={{margin: '24px 0'}} />
                    <Input type="textarea" placeholder="详细介绍" rows={4} onChange={this.handleDescription} />
                    <Collapse style={{marginTop: '30px'}}>
                        <Panel header="添加问题">
                            <fieldset>
                                <legend>类型</legend>
                                <RadioGroup defaultValue="radio" onChange={this.handleType}>
                                    <Radio value="radio">单选框</Radio>
                                    <Radio value="checkbox">多选框</Radio>
                                    <Radio value="textarea">文本域</Radio>
                                </RadioGroup>
                            </fieldset>
                            <fieldset>
                                <legend>配置</legend>
                                <label>是否必填</label>
                                <RadioGroup defaultValue="true" onChange={this.handleNecessary}>
                                    <Radio value="true">必填</Radio>
                                    <Radio value="false">选填</Radio>
                                </RadioGroup>
                                <label>问卷题</label>
                                <Input onChange={this.handleLabel} type="textarea" placeholder="题目" autosize/>
                                <label>选项</label>
                                <Input type="textarea" placeholder="可用空格，逗号，回车来分隔选项" autosize onBlur={this.handleItem} />
                                <ReactCSSTransitionGroup transitionName="example">
                                    {items}
                                </ReactCSSTransitionGroup>
                            </fieldset>
                            <Button onClick={this.handleQuestion} style={{marginTop: '20px'}} type="primary">新建问题</Button>
                        </Panel>
                    </Collapse>
                    <ReactCSSTransitionGroup transitionName="example">
                        {questions}
                    </ReactCSSTransitionGroup>
                    <label>截止日期：</label>
                    <DatePicker disabledDate={this.disabledDate} onChange={this.handleDate}
                        defaultValue={moment().locale('en').utcOffset(0)} locale={enUS} />
                    <Button onClick={this.handleSave} className="question" type="primary" style={{marginLeft: '20px'}}>保存问卷</Button>
                    <Button className="question" type="ghost">发布问卷</Button>
                </div>
			</div>
		);
	}
}