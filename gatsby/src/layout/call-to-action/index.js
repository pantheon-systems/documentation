import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './styles.css';

const propTypes = {
	dark: PropTypes.bool,
	url: PropTypes.string,
	title: PropTypes.string,
	subTitle: PropTypes.string
};

function CallToAction(props) {
	const { url, title, subTitle, dark } = props;
	return (
		<Link to={url}>
			<div
				className={`call-to-action guide-cta-landing ${dark && 'call-to-action--dark'}`}
				style={{ padding: '25px !important', display: 'block' }}
			>
				<h1 className="hero-video__guide-cta-title">
					{title}
					<i className="fa fa-angle-right" style={{ color: '#EFD01B' }} />
				</h1>
				<p className="hero-video__guide-cta-subtitle">{subTitle}</p>
			</div>
		</Link>
	);
}

CallToAction.propTypes = propTypes;

export default CallToAction;
