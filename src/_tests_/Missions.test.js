import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Missions from '../Components/Missions';
import { reserveMission } from '../redux/missions/missionsSlice';

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
            description: 'The first mission description.',
            membership: 'Not a member',
          },
          {
            id: 2,
            mission_name: 'Mission 2',
            description: 'The second mission description.',
            membership: 'Not a member',
          },
        ],
      },
    });

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
  });

  it('dispatches fetchMissionsData action on mount', () => {
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('dispatches reserveMission action when Join Mission button is clicked', () => {
    const joinButtons = component.getAllByRole('button', { name: 'Join Mission' });
    fireEvent.click(joinButtons[0]);

    expect(store.dispatch).toHaveBeenCalledWith(reserveMission(1));
  });

  it('matches the snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
