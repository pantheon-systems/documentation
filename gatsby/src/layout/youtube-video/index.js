import React from 'react';

const YoutubeVideo = ({ videoId }) => {
	return(
			<>
				<iframe
					width="560"
					height="315"
					src={`https://www.youtube.com/embed/${videoId}`}
					frameborder="0"
					allow="accelerometer; encrypted-media; gyroscope;"
					allowfullscreen>
				</iframe>
			</>
	)
}

export default YoutubeVideo;
