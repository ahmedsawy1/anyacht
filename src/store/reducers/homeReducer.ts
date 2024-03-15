import {createSlice} from '@reduxjs/toolkit';
import {
  getBoatsByCatg,
  getBoatsCity,
  getBoatTypes,
  getCities,
} from '../actions/homeActions';

interface IState {
  cities: any[];
  boatTypes: any[];
  searchLoader: boolean;
  boatsData: [];
}

const initialState: IState = {
  cities: [
    {
      id: null,
      image_link: null,
      text: null,
    },
    {
      id: null,
      image_link: null,
      text: null,
    },
    {
      id: null,
      image_link: null,
      text: null,
    }
  ],
  boatTypes: [
    {
      id: null,
      image_link: null,
      text: null,
    },
    {
      id: null,
      image_link: null,
      text: null,
    },
    {
      id: null,
      image_link: null,
      text: null,
    }
  ],
  searchLoader: false,
  boatsData: [],
};

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cities = action.payload;
    });
    builder.addCase(getBoatTypes.fulfilled, (state, action) => {
      state.boatTypes = action.payload;
    });
    builder.addCase(getBoatsCity.fulfilled, (state, action) => {
      console.log("getBoatsCity.fulfilled");
      state.boatsData = action.payload;
      state.searchLoader = false;
    });
    builder.addCase(getBoatsCity.pending, (state, action) => {
      state.searchLoader = true;
      console.log("getBoatsCity.pending");
    });
    builder.addCase(getBoatsCity.rejected, (state, action) => {
      state.searchLoader = false;
    });
    builder.addCase(getBoatsByCatg.fulfilled, (state, action) => {
      state.boatsData = action.payload;
      state.searchLoader = false;
    });
    builder.addCase(getBoatsByCatg.pending, (state, action) => {
      state.searchLoader = true;
    });
    builder.addCase(getBoatsByCatg.rejected, (state, action) => {
      state.searchLoader = false;
    });
  },
});

export default homeSlice.reducer;
