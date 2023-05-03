export const getAuthUser = (state) => state?.profile?.authUser || {};

export const getCurrentUserProfile = (state) => state?.profile?.currentUser || {};

export const getIsOnPageTab = (state) => state?.profile?.isOnPageTab;

export const getUserInfo = (state) => state?.profile?.userInfo || {};

export const getAccountBalance = (state) => state?.profile?.accountBalance || {};

export const getPreviewAccount = (state) => state?.profile?.previewAccount || {};

export const getNotifications = (state) => state?.profile?.notifications?.data || [];

export const getNotificationsInfo = (state) => state?.profile?.notifications || {};
