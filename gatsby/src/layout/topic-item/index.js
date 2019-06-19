import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image';

const propTypes = {};

function TopicItem(props) {
	const { topic } = props;
	return (
		<div className="pantheon-workflows flex-panel-item-platform-integrations">
			<a className="topic-info-link" href="/docs/get-started/">
				<div className="flex-panel-body-home">
					<div className={topic.secondary ? 'flex-panel-body-inner' : 'flex-panel-main-body-inner'}>
						<Image
							alt={topic.title}
							path={topic.icon}
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
			</a>
		</div>
	);
}

TopicItem.propTypes = propTypes;

export default TopicItem;
