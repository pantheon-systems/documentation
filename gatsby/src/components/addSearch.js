import React from 'react';
import {Helmet} from "react-helmet";

class AddSearch extends React.Component {

    render () {
        return (
            <div className="addsearch-container">
                <Helmet>
                    <script defer src="https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6"></script>
                </Helmet>
            </div>
        );
      }

}

export default AddSearch;


                
