import React from 'react';

const Callout = ({ type, children, title, link }) => {
  return (
    <div class="enablement">
      <h4 class={type}>
        <a target="_blank" rel="noopener noreferrer" href={link}>{title}</a>
      </h4>
      {children}
    </div>
  );
};

export default Callout;