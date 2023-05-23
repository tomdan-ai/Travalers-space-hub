import React from 'react';
import { useEffect } from 'react'
import { fetchMissionsData } from '../redux/missions/missionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);

  useEffect(() => {
    dispatch(fetchMissionsData());
  }, [dispatch])

  return (
    <table>
      <thead>
        <tr>
          <th>Mission</th>
          <th>Description</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {missions.map((mission) => (
          <tr key={mission.id}>
            <td>{mission.mission_name}</td>
            <td>{mission.description}</td>
            <td>Not a member</td>
            <td><button type='button'>Join Mission</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Missions;
