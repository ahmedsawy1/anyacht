import {createAsyncThunk} from '@reduxjs/toolkit';
import {showMessage} from 'react-native-flash-message';
import {axiosAPI} from '../../api/config';
import {AsyncKeys, saveItem} from '../../constants/helpers';

export const loginAction = createAsyncThunk(
  'login',
  async (params: {body: object; cb: () => void, cbErr: () => void;}) => {
    try {
      console.log(params.body);
      const {data} = await axiosAPI.post('auth/login-new', params.body);
      console.log('========auth/login==========');

      if (data.status == true) {
        params.cb();
        await saveItem(AsyncKeys.AUTH_TOKEN, data.token);
        await saveItem(AsyncKeys.USER_DATA, data);
      }
      showMessage({
        type: 'success',
        message: 'تم تسجيل الدخول بنجاح',
      });

      return data;
    } catch (error:any) {
      params.cbErr && params.cbErr();
      console.log('========err .. auth/login=========');
      console.log(error.response);
      
      showMessage({
        type: 'danger',
        message: 'حدث خطأ يرجي التاكد من رقم الهاتف وكلمة المرور',
      });
    }
  },
);

export const preLoginAction = createAsyncThunk(
  'preLogin',
  async (params: {body: any; cb: (data: any) => void, cbErr: () => void}) => {
    try {
      const {data} = await axiosAPI.post('auth/pre-login', params.body);
      console.log('========auth/pre-login==========');

      if (data.status == true) {
        params.cb(data);
      }
      if(!data.user_exists){
        if(params.body.type == 1){
          showMessage({
            type: 'success',
            message: 'تم ارسال رقم التحقق الى جوالك',
          });
        } else {
          showMessage({
            type: 'success',
            message: 'تم ارسال رقم التحقق الى ايميلك',
          });
        }
      }
      return data;
    } catch (error) {
      params.cbErr && params.cbErr();
      console.log('========err .. auth/pre-login=========');
      showMessage({
        type: 'danger',
        message: 'حدث خطأ',
      });
    }
  },
);

export const checkOtpAction = createAsyncThunk(
  'check-otp',
  async (params: {
    body: any;
    cb: (data: any) => void;
    cbErr: () => void;
  }) => {
    try {
      const {data} = await axiosAPI.post('auth/check-otp', params.body);
      console.log('===========auth/check-otp=============');

      if (data.status == true) {
        params.cb(data);
      }
      return data;
    } catch (error) {
      params?.cbErr && params?.cbErr();
      console.log('===========err .. auth/check-otp============');
      showMessage({type: 'danger', message: 'الرمز غير صحيح'});
      console.log(error.response);
    }
  },
);

export const forgetPasswordAction = createAsyncThunk(
  'forget-password',
  async (params: {
    body: any;
    cb: (data: any) => void;
    cbErr: () => void;
  }) => {
    try {
      const {data} = await axiosAPI.post('auth/forget-password', params.body);
      console.log('===========auth/forget-password=============');

      if (data.status == true) {
        params.cb(data);
      }
      showMessage({
        type: 'success',
        message: 'تم ارسال رقم التحقق الى جوالك',
      });
      return data;
    } catch (error: any) {
      params?.cbErr && params?.cbErr();
      console.log('===========err .. auth/forget-password============');
      showMessage({type: 'danger', message: 'الرمز غير صحيح'});
      console.log(error.response);
    }
  },
);
export const forgetPasswordCheckOtpAction = createAsyncThunk(
  'forget-password-otp',
  async (params: {
    body: any;
    cb: (data: any) => void;
    cbErr: () => void;
  }) => {
    try {
      const {data} = await axiosAPI.post('auth/forget-password-check-otp', params.body);
      console.log('===========auth/forget-password-check-otp=============');

      if (data.status == true) {
        params.cb(data);
        showMessage({
          type: 'success',
          message: 'تم التحقق بنجاح',
        });
      }
      return data;
    } catch (error: any) {
      params?.cbErr && params?.cbErr();
      console.log('===========err .. auth/forget-password-check-otp============');
      showMessage({type: 'danger', message: 'الرمز غير صحيح'});
      console.log(error.response);
    }
  },
);
export const forgetPasswordResetAction = createAsyncThunk(
  'forget-password-reset',
  async (params: {
    body: any;
    cb: (data: any) => void;
    cbErr: () => void;
  }) => {
    try {
      console.log(params.body);
      const {data} = await axiosAPI.post('auth/forget-password-reset', params.body);
      console.log('===========auth/forget-password-resetp=============');

      if (data.status == true) {
        params.cb(data);
        showMessage({type: 'success', message: 'تمت اعادة تعيين كلمة المرور'});
      }
      return data;
    } catch (error: any) {
      params?.cbErr && params?.cbErr();
      console.log('===========err .. auth/forget-password-reset============');
      showMessage({type: 'danger', message: 'الرمز غير صحيح'});
      console.log(error.response);
    }
  },
);

export const resendOtpAction = createAsyncThunk(
  'resend-otp',
  async (params: {
    body: any;
    cb: (data: any) => void;
    cbErr: () => void;
  }) => {
    try {
      const {data} = await axiosAPI.post('auth/resend-otp', params.body);
      console.log('===========auth/resend-otp=============');
      if (data.status == true) {
        params.cb(data);
        showMessage({type: 'success', message: 'تم اعادة ارسال الرمز بنجاح'});

      }
      return data;
    } catch (error: any) {
      params?.cbErr && params?.cbErr();
      console.log('===========err .. auth/forget-password============');
      showMessage({type: 'danger', message: 'الرمز غير صحيح'});
      console.log(error.response);
    }
  },
);

export const setUserName = createAsyncThunk(
  'setUserName',
  async (params: {body: any; cb: () => void}) => {
    try {
      const {data} = await axiosAPI.post('auth/update-name', params.body);
      console.log('===========auth/update-name=============');
      await saveItem(AsyncKeys.USER_DATA, {name: params.body.name});

      params.cb();
      return params.body.name;
    } catch (error: any) {
      console.log('===========err .. auth/update-name============');
      showMessage({type: 'danger', message: 'حدث خطأ'});
      console.log(error);
    }
  },
);

export const sendSupportMessage = createAsyncThunk(
  'sendSupportMessage',
  async (params: {body: object; cb: () => void}) => {
    try {
      const {data} = await axiosAPI.post('support', params.body);
      console.log('===========auth/sendSupportMessage=============');
      showMessage({type: 'success', message: 'تم ارسال الرسالة بنجاح'});
    } catch (error: any) {
      console.log('===========err .. sendSupportMessage============');
      showMessage({
        type: 'danger',
        message: 'حدث خطأ يجب ادخال جميع الحقول بطريقة صحيحة',
      });
      console.log(error?.response.data);
      params.cb();
    }
  },
);

export const updateMobile = createAsyncThunk(
  'updateMobile',
  async (params: {body: object; cb: () => void}) => {
    try {
      const {data} = await axiosAPI.post('auth/update-mobile', params.body);
      console.log('========auth/updateMobile==========');
      console.log(data);

      if (data.status == true) {
        params.cb();
        showMessage({
          type: 'success',
          message: 'تم ارسال كود التفعيل بنجاح',
        });
      }

      return data;
    } catch (error) {
      console.log('========err .. auth/updateMobile=========');
      console.log(error);
      showMessage({
        type: 'danger',
        message: 'حدث خطأ .. يرجي التاكد من الهاتف واعادة المحاولة',
      });
    }
  },
);

export const getUnseenMessages = createAsyncThunk(
  'unseen',
  async () => {
    try {
      const {data} = await axiosAPI.get(
        `unseen`,
      );
      console.log("unseen response");
      console.log(data);
      return data;
    } catch (error) {
      console.log('===========err .. unseen============');
      console.log(error);
    }
  },
);

export const updateMobileOTP = createAsyncThunk(
  'updateMobileOTP',
  async (params: {body: object; cb: () => void}) => {
    try {
      const {data} = await axiosAPI.post(
        'auth/update-mobile-confirm',
        params.body,
      );
      console.log('========auth/updateMobileOTP==========');

      if (data.status == true) {
        params.cb();
        showMessage({
          type: 'success',
          message: 'تم تحديث رقم الهاتف بنجاح',
        });
      }

      return data;
    } catch (error) {
      console.log('========err .. auth/updateMobileOTP=========');
      console.log(error);
      showMessage({
        type: 'danger',
        message: 'حدث خطأ .. يرجي التاكد من الهاتف واعادة المحاولة',
      });
    }
  },
);
