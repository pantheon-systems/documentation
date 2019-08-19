import React from 'react';

class AddSearchResults extends React.Component {
    componentDidMount() {
        const resultPage = this.props.resultPage
        const script = document.createElement('script')
        script.setAttribute('src', 'https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6&type=resultpage')
        script.setAttribute('defer', true)

        document.body.appendChild(script)
    }
    render () {
        return (
            <div className="addsearch-container" />
        );
      }

}

export default AddSearchResults;
