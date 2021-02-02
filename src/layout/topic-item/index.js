import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby'
import Image from '../image';
import './style.css';

const propTypes = {
	topic: PropTypes.object,
};

function TopicItem(props) {
	const { topic } = props;
	return (
		<div className="topic-item pantheon-workflows flex-panel-item-platform-integrations">
			<Link className="topic-info-link" to={topic.url}>
				<div className="flex-panel-body-home">
					<div className={topic.secondary ? 'flex-panel-body-inner' : 'flex-panel-main-body-inner'}>
						<Image
							alt={topic.title}
							path={`assets/${topic.icon}`}
							className={topic.secondary ? 'topic-info__image' : 'main-topic-info__plugin-image'}
						/>
						<div className={topic.secondary ? 'topic-info__description-well' : ''}>
							<h3
								className={topic.secondary ? 'topic-info__title' : 'hero-video__guide-main-topic-title'}
							>
								{topic.title}
							</h3>
							<p className={topic.secondary ? 'topic-info__description' : 'main-topic-info__description'}>
								{topic.summary}
							</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

TopicItem.propTypes = propTypes;

export default TopicItem;
