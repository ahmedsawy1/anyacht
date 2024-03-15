import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUnseenMessages, setUserName} from '../actions/authActions';

interface IState {
  isSignIn: boolean;
  loader: boolean;
  userName: string;
  userData: {};
  unseenMessages: number;
}

const initialState: IState = {
  isSignIn: false,
  userName: '',
  loader: false,
  userData: {},
  unseenMessages: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<{}>) => {
      state.userData = action.payload;
    },
    switchSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignIn = action.payload;
    },
    resetUnseen: (state) => {
      state.unseenMessages = 0;
    },
  },

  extraReducers: builder => {
    builder.addCase(setUserName.fulfilled, (state, action) => {
      state.userName = action.payload;
      state.loader = false;
    });
    builder.addCase(getUnseenMessages.fulfilled, (state, action) => {
      state.unseenMessages = action.payload;
    });
  },
});

export const {switchSignIn, getUserData, resetUnseen} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.test;

export default authSlice.reducer;
