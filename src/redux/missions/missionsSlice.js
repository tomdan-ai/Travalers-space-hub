import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  missions: [],
  status: 'idle',
  error: null,
};

export const fetchMissionsData = createAsyncThunk('missions/getData', async () => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v3/missions');
    const chosenData = response.data.map((mission) => ({
      id: mission.mission_id,
      mission_name: mission.mission_name,
      description: mission.description,
    }));
    return chosenData;
  } catch (error) {
    throw new Error('Failed to fetch missions data');
  }
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    addMission: (state, action) => {
      state.missions.push(action.payload);
    },
    removeMission: (state, action) => state.missions.filter((mission) => mission.id !== action.payload),
    reserveMission: (state, action) => {
      const id = action.payload;
      state.missions = state.missions.map((mission) => (mission.id !== id ? mission : { ...mission, reserved: true }));
    },
    leaveMission: (state, action) => {
      const id = action.payload;
      state.missions = state.missions.map((mission) => (mission.id !== id ? mission : { ...mission, reserved: false }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissionsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissionsData.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.missions = payload;
      })
      .addCase(fetchMissionsData.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const {
  addMission, removeMission, reserveMission, leaveMission,
} = missionsSlice.actions;

export default missionsSlice.reducer;
