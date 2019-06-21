import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layout/layout';
import CallToAction from '../layout/call-to-action';
import TopicsGrid from '../layout/topics-grid';
import ThreeColumnList from '../layout/three-column-list';
import ChangelogPreview from '../layout/changelog-preview';

class Index extends React.Component {
	render() {
		const { data: { homeYaml } } = this.props;
		return (
			<Layout>
				<div style={{ marginTop: '-20px' }} className="container">
					<div className="row doc-content-well">
						<div className="row">
							<h1 className="title">{homeYaml.title}</h1>
						</div>
						<div className="row" style={{ marginBottom: '15px' }}>
							<div className="col-md-12">
								<CallToAction
									title={homeYaml.call_to_action.title}
									subTitle={homeYaml.call_to_action.sub_title}
									url={homeYaml.call_to_action.url}
								/>
							</div>
						</div>
						<div class="row mb-70">
							<div class="col-md-12">
								<TopicsGrid topics={homeYaml.topics} />
							</div>
						</div>
						<ThreeColumnList title={homeYaml.three_column_links.title} links={homeYaml.three_column_links.links} />
						<ChangelogPreview title={homeYaml.changelog_preview.title} url={homeYaml.changelog_preview.url} />
					</div>
				</div>
			</Layout>
		);
	}
}

export default Index;

export const pageQuery = graphql`
	{
		homeYaml {
			title
			call_to_action {
				title
				sub_title
				url
			}
			topics {
				title
				summary
				icon
				url
        secondary
			}
			three_column_links {
				title
        links {
          text
          url
        }
			}
			changelog_preview {
				title
				url
			}
		}
	}
`;
