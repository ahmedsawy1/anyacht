import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getChatByID, getMyChats, sendMessage} from '../actions/chatActions';

interface IState {
  myChats: [];
  messages: any[];
  chatOverview: [];
  loader: boolean;
  msgLoader: boolean;
}

const initialState: IState = {
  myChats: [],
  messages: [],
  chatOverview: [],
  loader: false,
  msgLoader: false,
};

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },

  extraReducers: builder => {
    builder.addCase(getMyChats.fulfilled, (state, action) => {
      state.myChats = action.payload?.data;
      state.msgLoader = false;
    });
    builder.addCase(getMyChats.pending, (state, action) => {
      state.msgLoader = true;
    });
    builder.addCase(getMyChats.rejected, (state, action) => {
      state.msgLoader = false;
    });
    builder.addCase(getChatByID.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.messages.splice(-1);
    });
  },
});

export const {addMessage, clearMessages} =
chatSlice.actions;

export default chatSlice.reducer;
