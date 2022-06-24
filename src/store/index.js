import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';
export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      userInfo: undefined,
    };
  },
  getters: {},
  actions: {
    setUserInfo(data) {
      Local.set('userInfo', data);
      this.userInfo = data;
    },
  },
});
