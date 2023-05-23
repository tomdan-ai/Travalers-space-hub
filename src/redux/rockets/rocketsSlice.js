import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  status: 'idle',
  error: null,
};

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  try {
    const response = await axios.get('www.fakeapi.com/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch rockets');
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
      const rocketsIndex = state.rockets.findIndex((rocket) => rocket.id === action.payload);
      if (rocketsIndex !== -1) {
        state.rockets.splice(rocketsIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRockets.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.books = Object.entries(payload)
          .flatMap(([id, value]) => value.map((rocket) => ({ ...rocket, id })));
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

});

export const { addRockets, removeRockets } = rocketsSlice.actions;
export default rocketsSlice.reducer;
