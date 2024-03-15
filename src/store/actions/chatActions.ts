import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosAPI} from '../../api/config';

export const getMyChats = createAsyncThunk(
  'getMyChats',
  async (params: {page: number, cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.get(`messages`);
      params.cb && params.cb(data);
      return {data: data?.data, currentPage: params.page};
    } catch (error) {
      console.log('===========err .. getMyChats============');
      console.log(error);
    }
  },
);

export const getChatByID = createAsyncThunk('getChatByID', async params => {
  try {
    const {data} = await axiosAPI.get(`messages/${params.chatID}`);
    console.log('==================chatID==================');
    params.cb && params.cb();
    return data;
  } catch (error) {
    params.cb && params.cb();
    console.log('===========err .. getChatByID============');
    console.log(error);
  }
});

export const sendMessage = createAsyncThunk('sendMessage', async params => {
   
    const {data} = await axiosAPI.post(
      `messages/${params.chatID}`,
      params.body,
    );
    return data;
  
});