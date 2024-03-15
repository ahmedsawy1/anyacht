import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosAPI} from '../../api/config';

export const getCities = createAsyncThunk(
  'getCities',
  async () => {
    try {
      const {data} = await axiosAPI.get(`helper/lookups/city`);

      // params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. getCities============');
      console.log(error);
    }
  },
);

export const getBoatTypes = createAsyncThunk('getBoatTypes', async () => {
  try {
    const {data} = await axiosAPI.get(`helper/lookups/boat_type`);
    // console.log('===========getBoatTypes=============');
    // console.log(data);

    return data;
  } catch (error) {
    console.log('===========err .. getBoatTypes============');
    console.log(error);
  }
});

export const getBoatsCity = createAsyncThunk('getBoatCity', async params => {
  try {
    const {data} = await axiosAPI.get(`boats/city/${params.cityId}`);

    return data;
  } catch (error) {
    console.log('===========err .. getBoatCity============');
    console.log(error);
  }
});

export const getBoatsByCatg = createAsyncThunk(
  'getBoatsByCatg',
  async params => {
    try {
      const {data} = await axiosAPI.get(`boats/category/${params.catgId}`);

      return data;
    } catch (error) {
      console.log('===========err .. getBoatsByCatg============');
      console.log(error);
    }
  },
);
