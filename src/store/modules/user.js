// 请求方法
import { login, logout, getInfo } from "@/api/user";
// token 相关
import { getToken, setToken, removeToken } from "@/utils/auth";
// 路由
import router, { resetRouter } from "@/router";

// 用户状态信息
const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: "",
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // 登录方法
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username, password: password })
        .then((data) => {
          // 仓库 token
          commit("SET_TOKEN", data.token);
          // cookies token
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((data) => {
          const { roles, name, avatar, introduction } = data;
          if (!roles) {
            reject("getInfo: roles must be a non-null array!");
          }
          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", "");
          removeToken();
          resetRouter();

          // reset visited views and cached views
          dispatch("tagsView/delAllViews", null, { root: true });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 删除 token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", "");
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
