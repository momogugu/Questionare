import React from 'react';
import {
	connect
} from "react-redux";
import {
	bindActionCreators
} from 'redux';
import {
	Carousel
} from 'antd';

import * as projectActions from '../../actions/projectAction';
import ShowList from '../../components/ShowList/ShowList.jsx';
import './Home.less';

@connect(
	state => {
		return ({
			projects: state.project.publishedProject
		});
	},
	dispatch => {
		return ({
			projectActions: bindActionCreators(projectActions, dispatch)
		});
	}
)

export default class Home extends React.Component {
	constructor(props) {
			super(props);	
	}
	componentDidMount() {
		this.props.projectActions.getProjects();
	}
	render() {
		const projects = this.props.projects || [];
		const settings = {
			dots: true,
			infinite: true,
			speed: 500
		};
		return (
			<div className="home">
				<Carousel className="banner" effect="fade" autoplay {...settings}>
					<div><img className="message" src={require('../../static/img/2.png')} /></div>
					<div><img className="design" src={require('../../static/img/1.png')} /></div>
					<div><img className="join" src={require('../../static/img/3.png')} /></div>
					<div><img className="no1" src={require('../../static/img/4.png')} /></div>
				</Carousel>
				<div className="filter">
				</div>
				{
					(() => {
						if (projects.length) {
							return <ShowList projects={projects} />;
						}
						return <div style={{textAlign: 'center', paddingTop: '60px'}}>暂无数据</div>;
					})()
				}
			</div>
		);
	}
}