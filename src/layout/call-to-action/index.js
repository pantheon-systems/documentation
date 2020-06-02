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
	const { url, title, type, subTitle, dark } = props;
	if (/https?/.test(url)) {
		return (
			<>
			<a href={url}>
			<div
				className={`call-to-action ${dark && 'call-to-action--dark'}`}
			>
					<h3 className="call-to-action__type">
						{type}
					</h3>
				<h2 className="call-to-action__title">
					{title}
					<i className="fa fa-angle-right" style={{ color: '#EFD01B' }} />
				</h2>
				<p className="call-to-action__subtitle">{subTitle}</p>
			</div>
			</a>
			</>
		)
		}
		return (
			<Link to={url}>
				<div
					className={`call-to-action ${dark && 'call-to-action--dark'}`}
				>
					<h3 className="call-to-action__type">
						{type}
					</h3>
					<h2 className="call-to-action__title">
						{title}
						<i className="fa fa-angle-right" style={{ color: '#EFD01B' }} />
					</h2>
					<p className="call-to-action__subtitle">{subTitle}</p>
				</div>
			</Link>
		)
}

CallToAction.propTypes = propTypes;

CallToAction.defaultProps = {type: "doc"}

export default CallToAction;
