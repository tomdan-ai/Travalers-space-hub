import React from 'react';

const Rockets = () => {
  const rockets = [];
  return (
    <div>
      <h2>Books</h2>
      <ul>
        {rockets.map((rocket) => (
          <li key={rocket.id}>
            <img src="" alt="" />
            <h1>text</h1>
            <p>text</p>
            <button type="button">Reserve Rocket</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rockets;
