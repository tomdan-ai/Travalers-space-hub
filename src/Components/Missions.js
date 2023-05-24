import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMissionsData, reserveMission, leaveMission } from '../redux/missions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);
  const [currentMissionId, setCurrentMissionId] = useState(null);

  useEffect(() => {
    dispatch(fetchMissionsData());
  }, [dispatch]);

  const handleJoinMission = (missionId) => {
    dispatch(reserveMission(missionId));
    setCurrentMissionId(missionId);
  };

  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission(missionId));
    setCurrentMissionId(null);
  };

  return (
    <div className="missions-table">
      <div className="missions-table-row head">
        <div className="missions-table-cell mission-name">Mission</div>
        <div className="missions-table-cell description">Description</div>
        <div className="missions-table-cell status">Status</div>
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
            {currentMissionId === mission.id ? (
              <badge className="acmembership">Active member</badge>
            ) : (
              <badge className="membership">Not a member</badge>
            )}
          </div>
          <div className="missions-table-cell button">
            {currentMissionId === mission.id ? (
              <button onClick={() => handleLeaveMission(mission.id)} className="leave-button" type="submit">
                Leave Mission
              </button>
            ) : (
              <button onClick={() => handleJoinMission(mission.id)} className="join-button" type="submit">
                Join Mission
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Missions;
