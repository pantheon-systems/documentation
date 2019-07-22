import React from 'react';

class AddSearch extends React.Component {
    componentDidMount() {
        const script = document.createElement('script')
        script.setAttribute('src', 'https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6')
        script.setAttribute('defer', true)

        document.body.appendChild(script)
    }
    render () {
        return (
            <div className="addsearch-container" />
        );
      }

}

export default AddSearch;
