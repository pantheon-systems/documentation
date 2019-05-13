import React from 'react';

const Alert = ({ title, type, children }) => {
  const alertClass = `alert alert-${type}`;
  return (
    <div class={alertClass}>
      <h4 class={type}>{title}</h4>
      {children}
    </div>
  );
};

export default Alert;