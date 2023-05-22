import { createSlice } from '@reduxjs/toolkit';

const missionsSlice = createSlice({
  name: 'missions',
  initialState: [],
  reducers: {
    addMission: (state, action) => {
      state.push(action.payload);
    },
    removeMission: (state, action) => {
      return state.filter(mission => mission.id !== action.payload);
    },
  },
});

export const { addMission, removeMission } = missionsSlice.actions;

export default missionsSlice.reducer;
