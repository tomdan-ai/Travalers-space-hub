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
      <ul className="rocket">
        {rockets.map((rocket) => (
          <li key={rocket.id}>
            <img src={rocket.rocket_flickr_images} alt={rocket.name} />
            <div>
              <h1>{rocket.rocket_name}</h1>
              <p>{rocket.description}</p>
              <button type="button">Reserve Rocket</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rockets;
