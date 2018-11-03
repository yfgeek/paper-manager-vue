import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import paperStore from './paperStore';

Vue.use(Vuex);
const state = {
    requesting: false,
    error: {}
};

const getters = {
    requesting: state => state.requesting,
    error: state => state.error
};

export default new Vuex.Store({
    state,
    getters,
    modules: {
      paperStore,
    },
    plugins: [createPersistedState()],
})
