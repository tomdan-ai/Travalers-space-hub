import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Rockets from '../Components/Rockets';
import { fetchRocketsData, reserveRocket, unreserveRocket } from '../redux/rockets/rocketsSlice';

const mockStore = configureStore([]);

describe('Rockets component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      rockets: {
        rockets: [
          {
            id: 1,
            rocket_name: 'Falcon 1',
            description: 'A small rocket for small payloads.',
            rocket_flickr_images: 'https://www.flickr.com/photos/spacex/8884203235/in/photostream/',
            reserved: false,
          },
          {
            id: 2,
            rocket_name: 'Falcon 9',
            description: 'A medium-sized rocket for medium-sized payloads.',
            rocket_flickr_images: 'https://www.flickr.com/photos/spacex/8884203235/in/photostream/',
            reserved: true,
          },
        ],
      },
    });

    store.dispatch = jest.fn();
    store.dispatch(fetchRocketsData());

    component = render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );
  });

  it('dispatches fetchRocketsData action on mount', () => {
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('dispatches reserveRocket action when Reserve Rocket button is clicked', () => {
    const reserveButton = component.getByText('Reserve Rocket');
    fireEvent.click(reserveButton);

    expect(store.dispatch).toHaveBeenCalledWith(reserveRocket(1));
  });

  it('dispatches unreserveRocket action when Cancel Reservation button is clicked', () => {
    const cancelButton = component.getByText('Cancel Reservation');
    fireEvent.click(cancelButton);

    expect(store.dispatch).toHaveBeenCalledWith(unreserveRocket(2));
  });

  it('matches the snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
