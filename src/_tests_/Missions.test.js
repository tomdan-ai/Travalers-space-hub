import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Missions from '../Components/Missions';
import { reserveMission, leaveMission } from '../redux/missions/missionsSlice';

const mockStore = configureStore([]);

describe('Missions component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [
          {
            id: 1,
            mission_name: 'Mission 1',
            description: 'Description of Mission 1',
          },
          {
            id: 2,
            mission_name: 'Mission 2',
            description: 'Description of Mission 2',
          },
        ],
        reservedMissions: [2],
      },
    });

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
  });

  it('dispatches fetchMissionsData action on mount if missions array is empty', async () => {
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    await waitFor(() => {
      const state = store.getState();
      expect(state.missions.missions).not.toHaveLength(0);
    });
  });

  it('dispatches reserveMission action when Join Mission button is clicked', () => {
    const joinButton = component.getByText('Join Mission');
    fireEvent.click(joinButton);

    expect(store.dispatch).toHaveBeenCalledWith(reserveMission(1));
  });

  it('dispatches leaveMission action when Leave Mission button is clicked', () => {
    const leaveButton = component.getByText('Leave Mission');
    fireEvent.click(leaveButton);

    expect(store.dispatch).toHaveBeenCalledWith(leaveMission(2));
  });

  it('renders missions with correct status and buttons', () => {
    const mission1Status = component.getByText('Not a member');
    const mission2Status = component.getByText('Active member');
    const joinButton = component.getByText('Join Mission');
    const leaveButton = component.getByText('Leave Mission');

    expect(mission1Status).toBeInTheDocument();
    expect(mission2Status).toBeInTheDocument();
    expect(joinButton).toBeInTheDocument();
    expect(leaveButton).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
