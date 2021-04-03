<template>
  <div id="app" >

  <div class="main-wrapper card-user">
    <!-- Цикл отрисовки данных -->
    <div
      v-for="(item, index) in mockArrayTickets"
      :key="index"
      class="card-user__wrapper"
    >
      <!-- --------------------------------------------------------------------------------- -->
      <!--   номер тикета   -->

      <div class="card-user__ticket">#{{ item.ticket_number }}</div>
      <!-- --------------------------------------------------------------------------------- -->

      <!--   img  avatar -->
      <img :src="item.user.avatar" class="card-user__avatar" />
      <!-- --------------------------------------------------------------------------------- -->

      <!--    ФИО  -->
      <p class="card-user__name">{{ item.user.name }}</p>
      <!-- --------------------------------------------------------------------------------- -->

      <!--   тип обращения и обращение - обертка  -->
      <div class="card-user__treatment wrapper-treatment">
        <p class="wrapper-treatment__type">
          Тип обращения: <span>{{ item.subject }}</span>
        </p>

        <p class="wrapper-treatment__discription">
          Описание: {{ item.body_subject }}
        </p>
      </div>
      <!-- --------------------------------------------------------------------------------- -->

      <div class="card-user__right-part wrapper-right-block">
        <!--   статус   -->
        <div class="card-user__status-wrapper">
          <div
            class="card-user__color-status"
            :style="{ background: returnColorStatus(item.status) }"
          ></div>
          <div>{{ status(item.status) }}</div>
        </div>
        <!-- --------------------------------------------------------------------------------- -->

        <!--   приоритет   -->
        <div class="card-user__priority">{{ priority(item.priority) }}</div>
        <!-- --------------------------------------------------------------------------------- -->

        <!--  дата и время создания обращения    -->
        <div class="card-user__time">{{ item.time_create_ticket }}</div>
      </div>
      <!-- --------------------------------------------------------------------------------- -->
    </div>

  </div>

    <!-- кнопка taggle для popup add new ticket -->
    <button @click="btnAddNewTicket" class="btn-new-ticket">
      Add new ticket
    </button>


    <!-- получаю данные с формы из компонента форма -->
          <ModalTicet/>
  </div>
</template>

<script>

import ModalTicet from "@/components/ModalTicet.vue";
// 
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "App",
  components: {
    ModalTicet,
  },

  data() {
    
    return {

      mockArrayTickets:[
        {

        user: {
          name: "Сергей",
          email: "woadd@yandex.ru",
          avatar:
            "https://lh3.googleusercontent.com/ogw/ADGmqu9mwjd_DnKM_J5VCm0fPeUuIA1p-MU6rR7Fi0wV=s192-c-mo",
        },

        body_subject: "text text text text text text text text",
        subject: "Жалоба на сайт",
        status: 1,
        priority: 2,
        ticket_number: 1,
        time_create_ticket: '02 2021 18:12:42',
      }
      ],
      // 
      // 

      //   мои объекты
      colorStatus: {
        0: "#a9d86e",
        1: "#ff6c60",
        2: "#fcb322",
        3: "#bec3c7",
      },
      textStatus: {
        0: "Новый",
        1: "В обработке",
        2: "Отложено",
        3: "Закрыто",
      },
      prioritetStatus: {
        0: "Низкий",
        1: "Средний",
        2: "Высокий",
        3: "Критический",
      },
      //                   ПРИМЕР ЗАПРОСА JSON, ЧТО ОТПРАВЛЯТЬ ФОРМОЙ
      //       {
      //     "user": {
      //         "name": "Василий Васильев",
      //         "email": "vasya@gmail.com",
      //         "avatar": "https://lh3.googleusercontent.com/ogw/ADGmqu9mwjd_DnKM_J5VCm0fPeUuIA1p-MU6rR7Fi0wV=s192-c-mo"
      //     },
      //     "body_subject": "text text",
      //     "subject": "Оплата",
      //     "status": 0,
      //     "priority": 2,
      //     "ticket_number": 1,
      // }
    };
  },

  computed:{...mapGetters( ['GETTER_FLAG']),
  },

  methods: {

            ...mapActions( ['ACTION_FLAG'] ),
            
    btnAddNewTicket() {
        this.ACTION_FLAG()
    },


    returnColorStatus(numberStatus) {
      return this.colorStatus[+numberStatus];
    },

    status(getNumberStatus) {
      return this.textStatus[getNumberStatus];
    },

    priority(getNumberPriority) {
      return this.prioritetStatus[getNumberPriority];
    },

  },


};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #8c9297;
}

.btn-new-ticket {
  background: #78cd51;
  border: 1px solid #78cd51;
  padding: 10px 15px;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transition: 0.5s;
    background: #ffffff;
    color: #78cd51;
  }
}
// 
// 
// 
.card-user {
  &__wrapper {
    margin: 15px;
    display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    padding: 15px;
    border-radius: 15px;
    align-items: center;
    border: solid 2px #e1e4e8;
  }
  &__ticket {
    padding: 5px 10px;
    background: #f67a6e;
    color: #ffffff;
    border-radius: 5px;
  }
  &__avatar {
    display: block;
    max-width: 100px;
    height: auto;
    border-radius: 5px;
    margin-left: 15px;
  }

  &__name {
    display: flex;
    align-items: center;
    margin-left: 15px;
    width: 150px;
    color: #5f6d7f;
    word-break: break-all;
    padding: 15px;
    justify-content: center;
  }
  &__color-status {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin: 0 5px;
  }
  &__status-wrapper {
    display: flex;
    align-items: center;
  }
  &__text-no-tickets {
    max-width: 600px;
    margin: 10px auto;
    border: solid 1px #e1e4e8;
    border-radius: 5px;
    color: #a9d86e;
    padding: 15px;
    margin-top: 45px;
  }
  &__priority {
    margin-right: auto;
    margin-left: auto;
  }
  &__time {
    margin-right: auto;
  }

  &__right-part {
    display: flex;
    width: 40%;
  }
}
//
.wrapper-treatment {
  background: #eef1f5;
  padding: 20px 15px;
  padding-right: 35px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 15px;
  border-left: 6px solid #b7bdc4;

  p {
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: left;
    word-break: break-all;
  }

  &__type span {
    color: #0b99b2;
    font-weight: bold;
  }

  // &__discription {
  // }
}



@media screen and (max-width: 1200px) {
  .card-user__wrapper {
    flex-wrap: wrap;
    flex-direction: column;
  }

  .card-user__name {
    padding: 0;
    margin-left: 0;
  }

  .card-user__right-part {
    // margin-right: auto;
    // margin-left: auto;
    width: auto;
  }
  .card-user__priority {
    margin-right: 15px;
    margin-left: 15px;
  }
    .card-user__avatar {
    margin-left: 0;
    margin-top: 25px;
    max-width: 200px;
  }
}
@media screen and (max-width: 665px) {
.wrapper-treatment {
  width: auto;
}

}

@media screen and (max-width: 425px) {
.card-user__right-part {
  flex-direction: column;
  
}
.card-user__priority {
  margin-left: 0;
  margin-right: 0;
  margin-top: 15px;
  margin-bottom: 15px;
}
.form-ticet__wrapper-btns {
  margin-top: 15px;
    justify-content: center;
}
.form-ticet__wrapper-input p {
  font-size: 13px;
}
.form-ticet__error-text {
    margin-top: 5px;
    font-size: 13px;
}
.registration__title {
  margin: 0;
  font-size: 20px;
}

.form-ticet__button_cancel,
.form-ticet__button-create {
  height: 30px;
  width: 100px;
}
input, textarea {
  padding: 5px;
}
textarea {
  height: auto;
}
select {
  padding: 5px;
}
}
</style>
