import React from 'react';

export default class NotFound extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div style={{textAlign: "center"}}>
				<img src={require('../../static/img/404.jpg')} />
			</div>
		);
	}
}