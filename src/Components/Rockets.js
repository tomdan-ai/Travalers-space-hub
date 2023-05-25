import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRocketsData, reserveRocket, unreserveRocket } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);

  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(fetchRocketsData());
    }
  }, [rockets, dispatch]);

  const handleReserveRocket = (rocketId) => {
    const rocket = rockets.find((rock) => rock.id === rocketId);
    if (rocket.reserved) {
      dispatch(unreserveRocket(rocketId));
    } else {
      dispatch(reserveRocket(rocketId));
    }
  };

  return (
    <div>
      <ul className="rocket">
        {rockets.map((rocket) => (
          <li key={rocket.id}>
            <img src={rocket.rocket_flickr_images} alt={rocket.name} />
            <div>
              <h1>{rocket.rocket_name}</h1>
              <p>
                {rocket.reserved && <span>Reserved</span>}
                {rocket.description}
              </p>
              <button
                type="button"
                onClick={() => handleReserveRocket(rocket.id)}
                style={{
                  backgroundColor: rocket.reserved ? '#fff' : '#17bcee',
                  color: rocket.reserved ? '#000' : '#fff',
                  border: rocket.reserved ? '1px solid #000' : 'none',
                }}
              >
                {rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rockets;
