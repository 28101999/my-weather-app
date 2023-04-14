import React from 'react';

function GeolocationError({ message, onClear }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onClear}>Clear</button>
    </div>
  );
}

export default GeolocationError;
