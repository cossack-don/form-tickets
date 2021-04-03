import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        flag:false,
    },

    mutations: {
        MUTATION_FLAG(state) {
            state.flag = !state.flag;
        },
    },


    actions: {   
        ACTION_FLAG({ commit  }) {
            commit('MUTATION_FLAG');
        },
    },

    getters: {
    GETTER_FLAG(state) {
        return state.flag;
      },
    },
});
