import React, { Component } from 'react';

class AddSearch extends Component {
	componentWillMount() {
		const script3 = document.createElement('script');

    
		script3.src = `https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6`;

		document.body.appendChild(script3);
	}


    render() { 
        return (
            <script></script>
        );
    }

}

export default AddSearch;


                
