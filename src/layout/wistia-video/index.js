import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WistiaVideo extends Component {
	componentWillMount() {
		const { videoId } = this.props;
		const script1 = document.createElement('script');
		const script2 = document.createElement('script');

		script1.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
		script1.async = true;

		script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
		script2.async = true;

		document.body.appendChild(script1);
		document.body.appendChild(script2);
	}

	render() {
		const { videoId } = this.props;
		return (
			<div>
				<div className={`wistia_embed wistia_async_${videoId} videoFoam=true`} />
			</div>
		);
	}
}

WistiaVideo.propTypes = {};

export default WistiaVideo;
