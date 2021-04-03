<template>
  
  
  <!-- Анимация для всего модульного окна -->
  <transition name="fade">
   
      <div class="wrapper-form" v-if="GETTER_FLAG">
        
    <form class="form-ticet" >
     <div v-if="hideFormIfPostFormSucc">
      <!-- Form title  @submit.prevent -->
      <h4 class="registration__title">Новый тикет</h4>


      <transition name="fade">
         <div v-if="flagErrorForm" class="form-ticet__error-text">Обязательные поля к заполнению Имя и Email</div>
      </transition>

      <!-- name -->
      <div class="form-ticet__wrapper-input">
        <p class="form-ticet__name-input">Имя:</p>
        <input
          type="text"
          v-model.trim="formModal.user.name"
          placeholder="Имя"
          class=""
          :class="{borderInpuRerror:flagErrorForm}"
        />
      </div>

      <!-- email -->
      <div class="form-ticet__wrapper-input">
        <p class="form-ticet__name-input">Email:</p>
        <input
          type="email"
          v-model.trim="formModal.user.email"
          placeholder="Email"
          class=""
          :class="{borderInpuRerror:flagErrorForm}"
        />
      </div>

      <!-- discription -->
      <div class="form-ticet__wrapper-input">
        <p class="form-ticet__name-input">Сообщение:</p>
        <textarea
          type="text"
          v-model.trim="formModal.body_subject"
          placeholder="Cообщение"
        ></textarea>
      </div>

<!-- drop down selects  true/false -->
<div class="btn-drop-down-modal" @click="btnDropDownSelects">{{textBtnDropDown}}</div>

<!-- all selects -->
<transition name="fade">
<div v-if="dropDownSelects">
      <!-- selected first -->
      <div class="form-ticet__wrapper-input">
        <p class="form-ticet__name-input">Тип обращения:</p>
        <select v-model="selected">
          <option
            v-for="(item, index) in arrayMainList"
            :key="index"
            :value="item.text"
          >
            {{ item.text }}
          </option>
        </select>
      </div>

      <!-- ------------------------------------------ -->
      <!-- <span>Выбрано: {{ selected }} </span> --> 
      <!-- для теста -->
      <!-- ------------------------------------------ -->

      <!-- selected second -->
      <div class="form-ticet__wrapper-input">
        <p class="form-ticet__name-input">Приоритет обращения:</p>

        <select v-model="selected2">
          <option
            v-for="(item, index) in arrayPrioritet"
            :key="index"
            :value="item.text"
          >
            {{ item.text }}
          </option>
        </select>
      </div>

      <!-- ------------------------------------------ -->
      <!-- <span>Приоритет: {{ selected2 }}</span> -->
      <!-- для теста -->
      <!-- ------------------------------------------ -->

      <!-- selected thed -->
      <div class="form-ticet__wrapper-input">
        <p class="form-ticet__name-input">Cтатус обращения:</p>
        <select v-model="selected3">
          <option
            v-for="(item, index) in arrayStatusList"
            :key="index"
            :value="item.text"
          >
            {{ item.text }}
          </option>
        </select>
      </div>
</div>
</transition>
      <!-- ------------------------------------------ -->
      <!-- <span>Статус: {{ selected3 }}</span> -->
      <!-- для теста -->
      <!-- ------------------------------------------ -->

<!-- Кнопки формы -->
          <div class="form-ticet__wrapper-btns">
        <button class="form-ticet__button-create" @click.prevent="onSubmit">
          Создать
        </button>
        <button class="form-ticet__button_cancel" @click.prevent="btnClickCloseMainForm">
          Отмена
        </button>
      </div>

      </div>

       <!-- окно успешной отправки данных на сервер -->
       <div v-else class="popup-message-success">
         
         <h4 class="popup-message-success__title">Тикет успешно отправлен на обработку!</h4>
                 <div class="popup-message-success__icon-btn" @click.prevent="clickIconClosePopup">
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="348.333px" height="348.334px" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334;"
                    xml:space="preserve">
                  <g>
                    <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
                      c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
                      c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
                      l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
                      L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  </svg>
                </div>
       </div>
       
    </form>

  </div>
  </transition>

</template>

<script>
import axios from 'axios'
import { mapActions,mapGetters } from 'vuex'

export default {

  data() {
    return {
      // flags
      hideFormIfPostFormSucc:true,
      flagErrorForm:false,

      dropDownSelects:false,
      textBtnDropDown:'Показать опции',
      // -------------------------------------------------------
      selected: "Жалоба на пользователя",

      arrayMainList: [
        { text: "Жалоба на пользователя", value: "Жалоба на пользователя" },
        { text: "Жалоба на приложение", value: "Жалоба на приложение" },
        { text: "Жалоба на сайт", value: "Жалоба на сайт" },
        { text: "Оплата", value: "Оплата" },
        { text: "Функционал", value: "Функционал" },
        { text: "Авторизация", value: "Авторизация" },
        { text: "Модерация", value: "Модерация" },
        { text: "Другое", value: "Другое" },
      ],
      // -------------------------------------------------------
      selected2: "Низкий",

      arrayPrioritet: [
        { text: "Низкий", value: "0" },
        { text: "Средний", value: "1" },
        { text: "Высокий", value: "2" },
        { text: "Критический", value: "3" },
      ],
      // -------------------------------------------------------
      selected3: "Новый",
      arrayStatusList: [
        { text: "Новый", value: "0" },
        { text: "В обработке", value: "1" },
        { text: "Отложено", value: "2" },
        { text: "Закрыто", value: "3" },
      ],
      // -------------------------------------------------------
      formModal: {
        user: {
          name: "",
          email: "",
          avatar:
            "https://lh3.googleusercontent.com/ogw/ADGmqu9mwjd_DnKM_J5VCm0fPeUuIA1p-MU6rR7Fi0wV=s192-c-mo",
        },
        body_subject: "",
        subject: "",
        status: 0,
        priority: 0,
        ticket_number: 0,
      },
    };
  },
  // 
    computed:{ 
    ...mapGetters(['GETTER_FLAG'])
  },

  //   ------------------
  methods: {
    ...mapActions( ['ACTION_FLAG'] ),


btnDropDownSelects() {
  this.dropDownSelects = !this.dropDownSelects

  if(this.dropDownSelects) {
  this.textBtnDropDown = 'Скрыть опции'
  } else {
    this.textBtnDropDown = 'Показать опции'
  }

},
// клик по крестику в форме
    clickIconClosePopup() {
      this.hideFormIfPostFormSucc = true
      this.flagErrorForm = false
      this.ACTION_FLAG()
    },

    btnClickCloseMainForm() {
      this.flagErrorForm = false
      this.dropDownSelects = false
      this.ACTION_FLAG()
    },

    // отправка данных на сервер
    onSubmit() {
      let subject = "";
      let status = "";
      let priority = "";

      // SELECT 3
      this.arrayStatusList.forEach((item) => {
        if (item.text === this.selected3) {
          status = item.value;
        }
      });
      this.formModal.status = +status;


      // SELECT 1
      this.arrayMainList.forEach((item) => {
        if (item.text === this.selected) {
          subject = item.value;
        }
      });
      this.formModal.subject = subject;


      // SELECT 2
      this.arrayPrioritet.forEach((item) => {
        if (item.text === this.selected2) {
          priority = item.value;
        }
      });
      this.formModal.priority = +priority;


      //
      // проверка если name, email не пустые, можно добавить trim() минимальное значение строки
      if(this.formModal.user.email !== '' && this.formModal.user.name !== '' ) {

        axios
        // отправляем на сервер и передаем объект с данными
          .post('https://jsonplaceholder.typicode.com/posts',{

              user: {
                name: this.formModal.user.name,
                email: this.formModal.user.email,
                avatar:
                  "https://lh3.googleusercontent.com/ogw/ADGmqu9mwjd_DnKM_J5VCm0fPeUuIA1p-MU6rR7Fi0wV=s192-c-mo",
              },

            body_subject: this.formModal.body_subject,
            subject: this.formModal.subject,
            status: this.formModal.status,
            priority: this.formModal.priority,
            // увеличиваем id - тикета для нового
            ticket_number: this.formModal.ticket_number++,

            // Можно добавить еще время создания поста
            // time_create_ticket: timeCreateNewTicket,
            
          })
          // 
          .then(res => {
            // вывод запроса в консоль
            console.log(res.data)

          // флаги для блока "ошибки", скрытие основной формы
            this.flagErrorForm = false
            // this.ACTION_FLAG()
            this.hideFormIfPostFormSucc = false
            this.dropDownSelects = false
// ---------------------------------------------------------------
// Данные с формы, добавляем в vuex
        let addNewTicketInVuex = {
                      user: {
                        name: this.formModal.user.name,
                        email: this.formModal.user.email,
                        avatar:
                          "https://lh3.googleusercontent.com/ogw/ADGmqu9mwjd_DnKM_J5VCm0fPeUuIA1p-MU6rR7Fi0wV=s192-c-mo",
                      },

                    body_subject: this.formModal.body_subject,
                    subject: this.formModal.subject,
                    status: this.formModal.status,
                    priority: this.formModal.priority,
                    // увеличиваем id - тикета для нового
                    ticket_number: this.formModal.ticket_number++,
        }
        // Добавляем в массив объект, который лежит в VUEX 
        this.$store.state.arrayTickets.push(addNewTicketInVuex)

// ---------------------------------------------------------------
            // поля формы - resets
            this.formModal.user.name = ''
            this.formModal.user.email = ''
            this.formModal.body_subject = ''
            this.selected = 'Жалоба на пользователя'
            this.selected2 = 'Низкий'
            this.selected3 = 'Новый'
            
          })
          // если запрос упадет выкенет ошибку в консоль
          .catch(e => {
            console.log(e)
          })

      } else {
        // если поля пустые, добавить бордер к инпуту и выкинуть div с ошибкой
          this.flagErrorForm = true
      }
     
    },
  },
};
</script>

<style lang="scss">
// сообщение - успешное отправление формы
.popup-message-success{
position: relative;
display: flex;
justify-content: center;

  &__title {
color:#78cd51;
font-size: 23px;
  }

  &__icon-btn {
position: absolute;
right: 0;
cursor: pointer;
}
  &__icon-btn svg {
    fill:#ff6c60;
    width:30px;
    height: auto;
    transition: 0.5s;
  }
    &__icon-btn svg:hover {
fill: #d64335;;
  }
}

// Анимация vue встроенная
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

// 
// 
// 
.registration__title {
  font-size: 25px;
  margin: 5px 0;
}
.wrapper-form {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
}
.form-ticet {
  margin: 15px;
  display: flex;
  flex-direction: column;
  width: 600px;
  background: #ffffff;
  padding: 15px;
  border-radius: 5px;

&__error-text {
  color: #f67a6e;
  font-weight: bold;
  margin-top: 15px;
}

  &__name-input {
    font-weight: bold;
  }
  &__wrapper-input {
    display: flex;
    flex-direction: column;
    text-align: left;

    p {
      margin-bottom: 0;
    }
  }
  &__wrapper-btns {
    display: flex;
    margin-top: 50px;
  }
  &__button-create {
    background: #78cd51;
    border: 1px solid #78cd51;
    width: 130px;
    height: 40px;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
    transition: 0.5s;
    margin-right: 15px;
  }
  &__button-create:hover {
    transition: 0.5s;
    background: #ffffff;
    color: #78cd51;
  }
  &__button_cancel {
    background: #f67a6e;
    width: 130px;
    height: 40px;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
    transition: 0.5s;
    border: 1px solid #f67a6e;
  }
  &__button_cancel:hover {
    transition: 0.5s;
    background: #ffffff;
    color: #f67a6e;
  }
}

// 
.btn-drop-down-modal {
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  background: #78cd51;
  width: 200px;
  margin: 0 auto;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transition: 0.5s;
    background: #81eb50;
  }
}


// 
input,
textarea {

  max-width: 100%;
  color: #5f6d7f;
  font-size: 15px;
  border: none;
  padding: 15px;
  border-radius: 5px;
  background: #e1e4e8;
}
select {
  color: #5f6d7f;
  font-size: 15px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: #e1e4e8;
  border: none;
}
textarea {
  height: 100px;
  resize: none;
}

.borderInpuRerror {
  border:1px solid #f67a6e;
}
</style>