import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './style.css';

const propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	docs: PropTypes.array
};

function TopicGroup(props) {
	const { title, subTitle, docs } = props;
	return (
		<div className="col-md-6 topic-groups">
			<h3>{title}</h3>
			<p className="topic-info__description">{subTitle}</p>
			<ul className="topic-docs">
				{docs &&
					docs.map((doc) => (
						<li>
							<Link to={doc.url}>
								{doc.icon && <i className={doc.icon} />} {doc.text}
							</Link>
						</li>
					))}
			</ul>
		</div>
	);
}

TopicGroup.propTypes = propTypes;

export default TopicGroup;
