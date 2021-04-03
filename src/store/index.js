import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        flag: false,
        arrayTickets: [
            {
                user: {
                    name: 'Сергей',
                    email: 'ser@yandex.ru',
                    avatar:
                        "https://lh3.googleusercontent.com/ogw/ADGmqu9mwjd_DnKM_J5VCm0fPeUuIA1p-MU6rR7Fi0wV=s192-c-mo",
                },

                body_subject: 'text text',
                subject: 'Жалоба на пользователя',
                status: 2,
                priority: 1,
                // увеличиваем id - тикета для нового
                ticket_number: 0,
            }
        ]
    },

    mutations: {
        MUTATION_FLAG(state) {
            state.flag = !state.flag;
        },
    },


    actions: {
        ACTION_FLAG({ commit }) {
            commit('MUTATION_FLAG');
        },
    },

    getters: {
        GETTER_FLAG(state) {
            return state.flag;
        },
    },
});
