import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  status: 'idle',
  error: null,
};

export const fetchRocketsData = createAsyncThunk('rockets/fetchRocketsData', async () => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/rockets');
    const selectedData = response.data.map((rocket) => ({
      id: rocket.id,
      name: rocket.name,
      type: rocket.type,
      flickr_images: rocket.flickr_images,
    }));
    return selectedData;
  } catch (error) {
    throw new Error('Failed to fetch rocket data');
  }
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    addRockets: (state, action) => {
      state.rockets.push(action.payload);
    },
    removeRockets: (state, action) => {
      state.rockets = state.rockets.filter((rocket) => rocket.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRocketsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRocketsData.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.rockets = payload;
      })
      .addCase(fetchRocketsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

});

export const { addRockets, removeRockets } = rocketsSlice.actions;
export default rocketsSlice.reducer;
