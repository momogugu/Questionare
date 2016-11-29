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

// import * as Action
import './Home.less';

export default class Home extends React.Component {
	constructor(props) {
			super(props);
			
		}
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500
		};
		return (
			<div className="home">
				<Carousel className="banner" effect="fade" autoplay {...settings}>
					<div><img className="message" src={require('../../static/img/message.png')} /></div>
					<div><img className="design" src={require('../../static/img/design.png')} /></div>
					<div><img className="join" src={require('../../static/img/join.png')} /></div>
					<div><img className="no1" src={require('../../static/img/no1.png')} /></div>
				</Carousel>
				<div className="filter">
				</div>
				{
					(() => {
						return <div style={{textAlign: 'center', paddingTop: '60px'}}>暂无数据</div>;
					})()
				}
			</div>
		);
	}
}