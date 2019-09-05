import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './style.css';

const propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	topics: PropTypes.array
};

function SubtopicGroup(props) {
	const { title, subTitle, topics } = props;
	return (
		<div className="subtopic-container mb-70">
			<div className="subtopic-groups">
				<h3>{title}</h3>
				{subTitle && <p className="topic-info__description">{subTitle}</p>}
			</div>
			<div className="row">
				<div className="col-md-12">
					{topics &&
						topics.map((topic) => (
							<div key={topic.title} className="subtopic-lists col-md-6">
								{topic.title && <h4>{topic.title}</h4>}
								<ul className="topic-docs">
									{topic.links &&
										topic.links.map((link) => (
											<li key={link.url}>
												<Link to={link.url}>
													{link.icon && <i className={link.icon} />} {link.text}
												</Link>
											</li>
										))}
								</ul>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

SubtopicGroup.propTypes = propTypes;

export default SubtopicGroup;
