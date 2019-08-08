import React from 'react';
import { Link, graphql } from 'gatsby';
import SearchResults from '../components/searchResults';
import ResultLayout from '../layout/resultLayout';
import CallToAction from '../layout/call-to-action';
import TopicsGrid from '../layout/topics-grid';
import ThreeColumnList from '../layout/three-column-list';
import ChangelogPreview from '../layout/changelog-preview';

class Index extends React.Component {
	render() {
		return (
			<ResultLayout>
				<div style={{ marginTop: '-20px' }} className="container">
					<div className="row doc-content-well">
						<div className="row">
							<h1 className="title">Search Results</h1>
						</div>
						<div className="row" style={{ marginBottom: '15px' }}>

						</div>
						<div className="row mb-70">
							<div className="col-md-12">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-8 search-results">


									<SearchResults />



									<script src="https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6&type=resultpage"></script>
									</div>
								</div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</ResultLayout>
		);
	}
}

export default Index;

