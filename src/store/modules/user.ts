import { defineStore } from 'pinia';

import { LoginUser } from '@/api/model/loginUser';
import { Login } from '@/api/userLogin';
import { TOKEN_NAME } from '@/config/global';
import { usePermissionStore } from '@/store';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME), // 默认token不走权限
  }),
  getters: {},
  actions: {
    async login(user: LoginUser): Promise<boolean> {
      // 登录请求流程
      console.log(`用户信息:`, user);
      try {
        const { token } = await Login(user);
        if (token !== '用户名或者密码不正确！') {
          this.token = token;
          return true;
        }
      } catch (e) {
        console.log(e);
      }
      return false;
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
    },
    async removeToken() {
      this.token = '';
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
    },
  },
});
