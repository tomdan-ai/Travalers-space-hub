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
      id: mission.id,
      mission_name: mission.name,
      description: mission.description
    }));
    return chosenData;
  }catch (error) {
    throw new Error('Failed to fetch missions data')
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissionsData.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(fetchMissionsData.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.missions = payload;
      })
      .addCase(fetchMissionsData.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
  }
});
  

export const { addMission, removeMission } = missionsSlice.actions;

export default missionsSlice.reducer;
