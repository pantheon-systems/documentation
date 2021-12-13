import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Image from '../image';
import './style.css';

const propTypes = {
	url: PropTypes.string,
	image: PropTypes.string,
};

function IntegrationGuideItem(props) {
	const { url, image } = props;
	return (
		<div className="flex-panel-item-platform-integrations-guides">
			<Link to={url}>
				<div className="flex-panel-body-platform-integrations">
					<div className="platform-integrations">
						<Image alt={image} path={`assets/${image}`} className="main-topic-info__plugin-image" />
					</div>
				</div>
			</Link>
		</div>
	);
}

IntegrationGuideItem.propTypes = propTypes;

export default IntegrationGuideItem;
