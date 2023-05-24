import React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Missions from "../Components/Missions";

const mockStore = configureStore([]);

describe('Missions Component', () => {
    let store;
    const missionsData = [
        {id: 1, mission_name: 'Mission 1', description: 'Description 1',},
        {id: 2, mission_name: 'Mission 2', description: 'Description 2',},
    ];

    beforeEach(() => {
        store = mockStore({
            missions: {
                missions: missionsData,
            },
        });
    });


    it('should render the missions table correctly', () => {
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );


            expect(screen.getByText('Mission')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
            expect(screen.getByText('Status')).toBeInTheDocument();


            missionsData.forEach((mission) => {
                expect(screen.getByText(mission.mission_name)).toBeInTheDocument();
                expect(screen.getByText(mission.description)).toBeInTheDocument();
            });
    });


    it('should allow joining a mission', () => {
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );

            const joinButton = screen.getByText('Join Mission')[0];

            fireEvent.click(joinButton);

            expect(screen.getByText('Leave Mission')).toBeInTheDocument();
    });


    it('should allow leaving a mission', () => {
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );
            const joinButton =screen.getAllByText('Join Mission')[0];

            fireEvent.click(joinButton);

            const leaveButton = screen.getAllByText('Leave Mission')[0];
            
            fireEvent.click(leaveButton);

            expect(screen.getByText('Join Mission')).toBeInTheDocument();


        });


    it('should match the snapshot', () => {
        const { container } = render(
                <Provider store={store}>
                    <Missions />
                </Provider>
        );

        expect(container).toMatchSnapshot
    });
});