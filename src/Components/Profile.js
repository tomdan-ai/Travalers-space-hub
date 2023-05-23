import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const selectReservedRockets = (state) => state.rockets.rockets.filter((rocket) => rocket.reserved);
  const reservedRockets = useSelector(selectReservedRockets);

  return (
    <div>
      <h2>My Rockets</h2>
      <table className="rocket-table">
        <tbody>
          {reservedRockets.map((rocket) => (
            <tr key={rocket.id}>
              <td>{rocket.rocket_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProfile;
