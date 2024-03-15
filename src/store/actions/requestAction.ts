import {createAsyncThunk} from '@reduxjs/toolkit';
import {showMessage} from 'react-native-flash-message';
import {axiosAPI} from '../../../src/api/config';
import {Alert} from 'react-native';

export const reserveBoat = createAsyncThunk(
  'reserveBoat',
  async (params: {
    body: object;
    boatId: number;
    cb: (data: object) => void;
    cbErr: () => void;
  }) => {
    try {
      console.log('===========request .. reserveBoat============');
      console.log(params.body);
      const {data} = await axiosAPI.post(
        `boats/${params.boatId}/reserve`,
        params.body,
      );

      params.cb(data);
      return data;
    } catch (error) {
      Alert.alert('حدثت مشكلة \n' + error?.response.data.message);
      console.log('===========err .. reserveBoat============');
      console.log(error?.response.data.message);
      console.log(error?.response.data);
      params?.cbErr();
    }
  },
);

// export const paymentAction = createAsyncThunk(
//   'paymentAction',
//   async (params: {id: number; cb: (data: object) => void}) => {
//     try {
//       const {data} = await axiosAPI.get(`service/pay/${params.id}`);
//       console.log('===========payment Action=============');

//       params.cb(data);
//       return data;
//     } catch (error) {
//       console.log('===========err .. payment Action============');
//       console.log(error);
//     }
//   },
// );

export const getBoats = createAsyncThunk('getBoats', async () => {
  try {
    const {data} = await axiosAPI.get(`boats`);

    return data;
  } catch (error) {
    console.log('===========err .. getBoats============');
    console.log(error);
  }
});

export const getBoatByID = createAsyncThunk(
  'getBoatById',
  async (params: {boatId: number, cb:(data) =>void}) => {
    try {
      const {data} = await axiosAPI.get(`boats/${params.boatId}`);
      params.cb && params.cb(data?.fav)
      return data;
    } catch (error) {
      console.log('===========err .. getBoatById============');
      console.log(error);
    }
  },
);

export const getAvailableTimes = createAsyncThunk(
  'getAvailableTimes',
  async (params: {
    boatId: number;
    cb: (data: object) => void;
    dateString: string;
  }) => {
    try {
      const {data} = await axiosAPI.get(
        `boats/${params.boatId}/check-with-booked?date=${params.dateString}`,
      );
      console.log(data);
      params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. getAvailableTimes============');
      console.log(error);
    }
  },
);

export const paymentAction = createAsyncThunk(
  'paymentAction',
  async (params: {
    id: number;
    cb: (data: object) => void;
    payBrand: string;
  }) => {
    try {
      // const {data} = await axiosAPI.get(`service/pay/${params.id}`);
      // todoooooo
      const {data} = await axiosAPI.get(
        `service/pay/${params.id}?brand=${params?.payBrand}`,
      );

      params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. payment Action============');
      console.log(error);
    }
  },
);

export const getMyOrders = createAsyncThunk(
  'user-orders',
  async (params: {page: number; status: string; cb: (data: {}) => void}) => {
    try {
      const {data} = await axiosAPI.get(
        `user-orders?page=${params.page}&status=${params.status}`,
      );
      params.cb && params.cb(data);
      return {data: data?.data, currentPage: params.page};
    } catch (error) {
      console.log('===========err .. user-orders============');
      console.log(error);
    }
  },
);

export const reteOrder = createAsyncThunk(
  'rate-order',
  async (params: {
    orderId: number;
    rate: number;
    comment: string;
    cb: (data: {}) => void;
  }) => {
    try {
      const {data} = await axiosAPI.post(`orders/${params.orderId}/rate`, {
        rate: params.rate,
        comment: params.comment,
      });

      params.cb && params.cb(data);
      return {data: data?.data};
    } catch (error) {
      console.log('===========err .. rate-orders============');
      console.log(error?.response.data.message);
    }
  },
);
