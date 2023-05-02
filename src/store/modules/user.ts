import { defineStore } from 'pinia';

import { LoginUser } from '@/api/model/loginUser';
import { Login } from '@/api/userLogin';
import { TOKEN_NAME } from '@/config/global';
import { store, usePermissionStore } from '@/store';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME), // 默认token不走权限
  }),
  getters: {},
  actions: {
    async login(user: LoginUser) {
      // 登录请求流程
      console.log(`用户信息:`, user);
      try {
        const token = await Login(user);
        if (token !== '用户名或者密码不正确！') {
          this.token = token;
          localStorage.setItem(TOKEN_NAME, token);
          console.log(localStorage.getItem(TOKEN_NAME));
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getUserInfo() {
      const mockRemoteUserInfo = async (token: string) => {
        if (token === 'main_token') {
          return {
            name: 'td_main',
            roles: ['all'], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
          };
        }
        return {
          name: 'td_dev',
          roles: ['UserIndex', 'DashboardBase', 'login'], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
        };
      };
      const res = await mockRemoteUserInfo(this.token);

      this.userInfo = res;
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

export function getUserStore() {
  return useUserStore(store);
}
