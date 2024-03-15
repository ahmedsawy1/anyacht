import {createAsyncThunk} from '@reduxjs/toolkit';
import {showMessage} from 'react-native-flash-message';
import {axiosAPI} from '../../../src/api/config';

export const getTimesOfWeek = createAsyncThunk(
  'getTimesOfWeek',
  async (params: {boatId: number; cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.get(`boats/${params.boatId}/schedule`);
      params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. getTimesOfWeek============');
      console.log(error.response.data.message);
    }
  },
);

export const addTimesOfWeek = createAsyncThunk(
  'addTimesOfWeek',
  async (params: {boatId: number; body: {}; cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.post(
        `boats/${params.boatId}/schedule`,
        params.body,
      );
      params.cb(data);

      showMessage({type: 'success', message: 'تم اضافة الوقت بنجاح'});
      return data;
    } catch (error) {
      console.log('===========err .. addTimesOfWeek============');
      console.log(error.response.data.message);
    }
  },
);
