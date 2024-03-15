import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

// Define a type for the slice state
interface CounterState {
  oneDay: string;
  oneTime: {};
  selectedDays: any[];
  onlyOneDay: boolean;
  timeFrom: string | number;
  timeTo: string | number;
}

// Define the initial state using that type
const initialState: CounterState = {
  oneDay: '',
  oneTime: 0,
  selectedDays: [],
  onlyOneDay: true,
  timeFrom: '',
  timeTo: '',
};

export const counterSlice = createSlice({
  name: 'date',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeIsOnlyDay: state => {
      state.onlyOneDay = !state.onlyOneDay;
      state.oneDay = '';
      state.selectedDays = [];
    },
    selectOneDay: (state, action: PayloadAction<string>) => {
      state.oneDay = action.payload;
      state.selectedDays = [action.payload];
    },
    selectOneTime: (state, action: PayloadAction<Date>) => {
      state.oneTime = action.payload;
    },

    selectTimeFrom: (state, action: PayloadAction<string>) => {
      state.timeFrom = action.payload;
    },
    selectTimeTo: (state, action: PayloadAction<string>) => {
      state.timeTo = action.payload;
    },

    resetDates: state => {
      state.oneDay = '';
      state.oneTime = 0;
      state.timeFrom = '';
      state.timeTo = '';
      state.selectedDays = [];
    },
  },
});

export const {
  selectOneDay,
  resetDates,
  changeIsOnlyDay,
  selectOneTime,
  selectTimeFrom,
  selectTimeTo,
} = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const dateSlice = (state: RootState) => state.dateSlice;

export default counterSlice.reducer;
