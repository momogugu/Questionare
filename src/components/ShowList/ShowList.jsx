import React from 'react';
import {
	Link
} from 'react-router';

import './ShowList.less';
import '../../static/font/css/fontello.css';

export default class ShowList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listNum: 9
		};
		this.showMore = this.showMore.bind(this);
	}
	showMore() {
		let listNum = this.state.listNum + 9;
        if (listNum < this.props.projects.length) {
            listNum = this.props.projects.length;
        }
        this.setState({
            listNum
        });
	}
	render() {
		const {
			projects
		} = this.props;
		let list = 0;
		let listComps = projects.map(item => {
			if (list === this.state.listNum) {
				return false;
			}
			list ++;
			let imgUrl = require(`../../static/img/project/${(parseInt(item._id, 16) % 10 + 1)}.png`);
			return (
				<div className='list-item' key={item._id}>
					<Link to={'/project/' + item._id} className="img" 
						style={{backgroundImage: `url(${imgUrl})`}}>
						<div className="introduction">
							<p>{item.description}</p>
							<p><i className="icon-pencil"></i>填写问卷</p>
						</div>
					</Link>
					<div className="list-content">
						<div className="name">{item.title}</div>
						<div className="deadline">截止时间：{(new Date(item.deadline)).toLocaleDateString()}</div>
						<div className="roles-icons">
							<div className="icons">
								<span><i className="icon-eye"></i>{item.views}</span>
                                <span><i className="icon-comment"></i>0</span>
							</div>
						</div>
					</div>
				</div>
			)
		});
		listComps = listComps.filter(item => item !== false);
		return (
			<div className="show-list clearfix">
				{
					(() => {
						if (listComps.length) {
							return listComps;
						}
						return <div style={{textAlign: 'center', paddingTop: '60px'}}>暂无数据</div>;
					})()
				}
				<div className="show-more">
					{
						(() => {
							if (listComps.length === projects.length) {
								return <div>已经没有了</div>;
							}
							return <div onClick={this.showMore} >显示更多</div>;
						})()
					}
				</div>
			</div>
		);
	}
}