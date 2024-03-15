import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTimesOfWeek} from '../actions/timesActions';

interface IState {
  timeOfWeekArr: [];
}

const initialState: IState = {
  timeOfWeekArr: [],
};

export const timesSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getTimesOfWeek.fulfilled, (state, action) => {
      state.timeOfWeekArr = action.payload;
    });
  },
});

export const {} = timesSlice.actions;

export default timesSlice.reducer;
