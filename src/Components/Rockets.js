import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRocketsData } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);

  useEffect(() => {
    dispatch(fetchRocketsData());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {rockets.map((rocket) => (
          <li key={rocket.id}>
            <img src={rocket.flickr_images} alt={rocket.name} />
            <h1>{rocket.name}</h1>
            <p>{rocket.type}</p>
            <button type="button">Reserve Rocket</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rockets;
