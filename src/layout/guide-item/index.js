import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Image from '../image';
import './style.css';

const propTypes = { url: PropTypes.string, text: PropTypes.string, image: PropTypes.string };

function GuideItem(props) {
	const { url, text, image } = props;
	return (
		<div className="flex-panel-item-guides-landing">
			<div className="flex-panel-body-pantheon-workflows">
				<Link to={url}>
					<div className="pantheon-workflows">
						<Image
							alt={text}
							path={`assets/${image}`}
							style={{ maxHeight: '200px' }}
							className="main-topic-info__plugin-image"
						/>
						<h3>{text}</h3>
					</div>
				</Link>
			</div>
		</div>
	);
}

GuideItem.propTypes = propTypes;

export default GuideItem;
