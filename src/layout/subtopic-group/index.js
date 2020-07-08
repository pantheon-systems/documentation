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
	const { title, subTitle, topics, pages } = props;
	return (
		<section className="subtopic-container row">
				<h3>{title}</h3>
				{subTitle && <p className="topic-info__description">{subTitle}</p>}

			<div className="row">
				<div className="col-md-12">
					{topics &&
						topics.map((topic) => (
							<div key={topic.title} className="subtopic-lists col-md-6">
								{topic.title && <h4>{topic.title}</h4>}
								<ul className="topic-docs">
									{pages &&
										pages.nodes.map((page) => (
											<li key={page.fields.slug}>
												<Link to={page.fields.slug}>
													{link.icon && <i className={link.icon} />} {page.frontmatter.title}
												</Link>
											</li>
										))}
								</ul>
							</div>
						))}
				</div>
			</div>
		</section>
	);
}

SubtopicGroup.propTypes = propTypes;

export default SubtopicGroup;
