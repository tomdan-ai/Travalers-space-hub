import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMissionsData } from '../redux/missions/missionsSlice';
import { reserveMission } from '../redux/missions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);

  useEffect(() => {
    dispatch(fetchMissionsData());
  }, [dispatch]);


  const handleJoinMission = () => {
    dispatch(reserveMission(missions.id));
  };

  return (
    <div className="missions-table">
      <div className="missions-table-row head">
        <div className="missions-table-cell">Mission</div>
        <div className="missions-table-cell">Description</div>
        <div className="missions-table-cell">Status</div>
        <div className="missions-button-cell" />
      </div>
      {missions.map((mission) => (
        <div key={mission.id} className="missions-table-row">
          <div className="missions-table-cell mission-name">
            {mission.mission_name}
          </div>
          <div className="missions-table-cell description">
            {mission.description}
          </div>
          <div className="missions-table-cell status">
            <button className="membership" type="button">Not a member</button>
          </div>
          <div className="missions-table-cell button">
          <button onClick={handleJoinMission} className="join-button">
        Join Mission
      </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Missions;
