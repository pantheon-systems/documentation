import React from 'react';

const ExternalLink = ({ text, link }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={link} title="" className="external">{text}</a>
  );
};

export default ExternalLink;