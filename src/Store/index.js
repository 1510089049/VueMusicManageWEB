// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        // 其他状态属性可以在这里定义
    },
    mutations: {
        setLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
        // 其他状态修改方法可以在这里定义
    },
    actions: {
        // 异步操作和业务逻辑可以在这里定义
    },
    getters: {
        // 状态的计算属性可以在这里定义
    }
});
