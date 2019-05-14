import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <header>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://pantheon.io/docs/assets/compiled/compiled.css?v=12.6"/>
        <script src="https://pantheon.io/docs/assets/js/main.js" />
      </header>
      {children}
    </>
  );
};

export default Layout;