import React, { Component } from 'react';
import PropTypes from 'prop-types';

class YoutubeVideo extends Component {
	render() {
		const { videoURL } = this.props;
    const source = 'https://www.youtube.com/embed/${videoURL}';
		return (
			<div>
        <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + this.props.videoURL} frameborder="0" allow="accelerometer; encrypted-media; gyroscope;" allowfullscreen></iframe>
			</div>
		);
	}
}

YoutubeVideo.propTypes = {};

export default YoutubeVideo;
