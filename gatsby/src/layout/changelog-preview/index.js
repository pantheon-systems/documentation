import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ChangelogPreview = (props) => {
	const { title, url } = props;
	return (
		<div className="row mb-70 changelog-preview">
			<div className="col-md-8">
				<div className="changelog-wrapper mb-70">
					<h2 className="subtitle">{title}</h2>
					<h3>Pantheon Heroes</h3>
					<p>
						Our new advocacy program,
						<a href="https://community.pantheon.io/" className="external">
							Pantheon Heroes
						</a>
						is in full swing. If you love Pantheon, the Open Web, and helping others,
						<a href="https://community.pantheon.io/#apply" className="external">
							apply for Hero Status
						</a>
						so we can help you help the world.
					</p>
					<br />
					<a href={url} className="cta">
						More
					</a>
				</div>
			</div>
			<div className="col-md-4 mt-70">
				<ul className="changelog-sidebar">
					<li>
						<a href="/docs/changelog/2019/05/">May 2019</a>
					</li>
					<li>
						<a href="/docs/changelog/2019/04/">April 2019</a>
					</li>
					<li>
						<a href="/docs/changelog/2019/03/">March 2019</a>
					</li>
					<li>
						<a href="/docs/changelog/2019/02/">February 2019</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

ChangelogPreview.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string,
};

export default ChangelogPreview;
