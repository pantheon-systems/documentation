import React from "react";
import Script from "next/script";
import './addsearch.css'

const AddSearchWidget = () => {
      return (
        <>
          <Script
            src="https://cdn.addsearch.com/v5/addsearch-ui.min.js?key=a7b957b7a8f57f4cc544c54f289611c6&id=search" // Replace with your actual AddSearch script URL
            strategy="afterInteractive"
            onLoad={() => {
              // Optional: You can perform actions after the script loads
              console.log('AddSearch script loaded successfully!');
            }}
          />

          {/* AddSearch Search Box or Results Container */}
          <div id="addsearch-container"></div> {/* Or your specific input field */}
        </>
      );
    };

    export default AddSearchWidget
