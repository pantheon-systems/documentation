import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://pantheon.io/docs/assets/compiled/compiled.css?v=12.6" />
      </header>
      {children}
    </>
  );
};

export default Layout;