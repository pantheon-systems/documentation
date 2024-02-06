import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import './styles.css';

const ChangelogPreview = (props) => {
	const { title, url, releasenotes } = props;
	const current = releasenotes[0];
	return (
		<div className="row mb-70 changelog-preview">
			<div className="col-md-8">
				<div className="changelog-wrapper mb-70">
					<h2 className="subtitle">{title}</h2>
					<MDXProvider>
						<MDXRenderer>{current.node.fields.markdownBody.childMdx.body}</MDXRenderer>
					</MDXProvider>
					<Link
						to={`${url}/`}
						className="ctaBtn cta"
					>
						Read More
					</Link>
				</div>
			</div>
			<div className="col-md-4 mt-70">
				<ul className="changelog-sidebar">
					{releasenotes.map((releasenote)=>(
						<li key={releasenote.node.id}>
							<Link to={`/${releasenote.node.fields.slug}`}>{releasenote.node.frontmatter.title}</Link>
						</li>
          ))}
				</ul>
			</div>
		</div>
	);
};

ChangelogPreview.propTypes = {};

export default ChangelogPreview;
