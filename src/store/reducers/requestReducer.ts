import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getAvailableTimes,
  getBoatByID,
  getBoats,
  getMyOrders,
} from '../actions/requestAction';

interface IState {
  availableTimes: {schedule:[], booked: []};
  myOrders: [];
  boatsData: {};
  singleBoatData: {};
  paymentMethod: string;
  loader: boolean;
}

const initialState: IState = {
  availableTimes: {schedule:[], booked: []},
  myOrders: [],
  paymentMethod: '',
  boatsData: {},
  singleBoatData: {},
  loader: false,
};

export const requestSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setPaymentMethood: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    resetAvailableTimes: state => {
      state.availableTimes = {schedule: [], booked: []};
    },
  },

  extraReducers: builder => {
    builder.addCase(getAvailableTimes.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getAvailableTimes.fulfilled, (state, action) => {
      state.loader = false;
      state.availableTimes = action.payload;
    });
    builder.addCase(getAvailableTimes.rejected, (state, action) => {
      state.loader = false;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.loader = false;
      state.myOrders = action.payload?.data;
    });
    builder.addCase(getMyOrders.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.loader = false;
    });
    builder.addCase(getBoats.fulfilled, (state, action) => {
      state.boatsData = action.payload;
    });
    builder.addCase(getBoatByID.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getBoatByID.fulfilled, (state, action) => {
      state.singleBoatData = action.payload;
      state.loader = false;
    });
    builder.addCase(getBoatByID.rejected, (state, action) => {
      state.loader = false;
    });
  },
});

export const {resetAvailableTimes, setPaymentMethood} =
  requestSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const services = (state: RootState) => state.services;

export default requestSlice.reducer;
