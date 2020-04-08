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
	if (/https?/.test(url)) {
		return (
			<>
			<a href={url}>
			<div
				className={`call-to-action ${dark && 'call-to-action--dark'}`}
				style={{ padding: '25px !important', display: 'block' }}
			>
				<h1 className="call-to-action__title">
					{title}
					<i className="fa fa-angle-right" style={{ color: '#EFD01B' }} />
				</h1>
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
					style={{ padding: '25px !important', display: 'block' }}
				>
					<h1 className="call-to-action__title">
						{title}
						<i className="fa fa-angle-right" style={{ color: '#EFD01B' }} />
					</h1>
					<p className="call-to-action__subtitle">{subTitle}</p>
				</div>
			</Link>
		)
}

CallToAction.propTypes = propTypes;

export default CallToAction;
