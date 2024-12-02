import React from 'react';

import './style.css';

const PublishedDate = ({ dateString, className }) => {
  // Todo, more type checking.
  if (!dateString) {
    return null;
  }
  const [year, month, day] = dateString.split('-'); // Extract year, month, and day
  const formattedDate = `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${parseInt(day)}, ${year}`;

  return (
    <div
      className={['docs-published-date', className]
        .join(' ')
        .trim()
        .replace(/\s+/g, ' ')}
    >
      {formattedDate}
    </div>
  );
};

export default PublishedDate;
