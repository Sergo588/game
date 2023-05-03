import { createSlice } from '@reduxjs/toolkit';
import {
  getProfile,
  getCurrentProfileByID,
  getPreviewProfileByID,
  checkAuth,
  loadMoreNotifications,
} from 'store/userSlice/asyncActions';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    currentUser: {},
    authUser: {},
    notifications: {
      isEnough: false,
      isLoading: false,
      data: [],
    },
    previewAccount: {},
    accountBalance: {
      isFirstLoaded: false,
    },
    isOnPageTab: true,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setBalance(state, action) {
      state.accountBalance = action.payload;
    },
    setPreviewAccount(state, action) {
      state.previewAccount = action.payload;
    },
    removePreviewAccount(state) {
      state.previewAccount = {};
    },
    updateCurrentUser(state, action) {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    clearAuthUser(state) {
      state.authUser = {};
    },
    setIsOnPageTab(state, action) {
      state.isOnPageTab = action.payload;
    },
    setAuthUser(state, action) {
      state.authUser = { ...state.authUser, ...action.payload };
    },
    addNotification(state, action) {
      state.notifications?.data?.unshift?.(action.payload);
    },
    setNotifications(state, action) {
      state.notifications.data = action.payload.notifications;
      state.notifications.isEnough = !action.payload.there_is_more;
    },
    setViewedNotifications(state) {
      state.notifications.data = (state?.notifications?.data || []).map((notif) => {
        return {
          ...notif,
          isNew: false,
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentProfileByID.fulfilled, (state, action) => {
        state.currentUser = { ...state.currentUser, ...action.payload, isLoading: false };
        if (state.authUser.id === action.payload.id) {
          state.authUser = { ...state.authUser, ...action.payload, isLoading: false };
        }
      })
      .addCase(getPreviewProfileByID.fulfilled, (state, action) => {
        state.previewAccount = { ...state.previewAccount, ...action.payload, isLoading: false };
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.currentUser = { ...state.currentUser, ...action.payload, isLoading: false };
      })
      .addCase(getProfile.pending, (state, action) => {
        // Add user to the state array
        state.currentUser = { ...state.currentUser, ...action.payload, isLoading: true };
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.currentUser = { ...action.payload, isLoading: false };
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = { ...action.payload, isLoading: false };
      })
      .addCase(checkAuth.pending, (state, action) => {
        // Add user to the state array
        state.authUser = { ...action.payload, isLoading: true };
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.authUser = { error: action.payload, isLoading: false };
      })
      .addCase(loadMoreNotifications.fulfilled, (state, action) => {
        state.notifications.isEnough = !action.payload.there_is_more;
        state.notifications.data = [...state.notifications.data, ...action.payload.notifications];
        state.notifications.isLoading = false;
      })
      .addCase(loadMoreNotifications.pending, (state) => {
        state.notifications.isLoading = true;
      })
      .addCase(loadMoreNotifications.rejected, (state) => {
        state.notifications.isLoading = false;
      });
  },
});

export const userReducer = userSlice.reducer;

export const {
  setBalance,
  setPreviewAccount,
  updateCurrentUser,
  clearAuthUser,
  setUserInfo,
  setAuthUser,
  removePreviewAccount,
  addNotification,
  setViewedNotifications,
  setNotifications,
  setIsOnPageTab,
} = userSlice.actions;
