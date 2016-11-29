import React from 'react';
import './Footer.less';

export default class Footer extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string
	// };

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="footer">
				Copyright &copy; mogu 2016.11
			</div>
		);
	}
}