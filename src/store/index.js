import { createStore } from 'vuex'
import router from '../router/index'

export default createStore({
  state: {
    isAuthed: false,
    logStatus: 'Login',
    user: '',

    pages: Number,    //TOTAL PAGES COUNT
    page: 1,          //THE SINGLE PAGE
    limit: 10,        //SINGLE PAGE SIZE (LIMIT OF DATA TO DISPLAY IN A SINGLE PAGE)

    pageActive: Number,   // SELECT CURRENT ACTIVE PAGE (NUMBER)

    shoppingList: [],         // ALL FETCHED DATA
    pagedShoppingList: [],    // ASSIGNED (SINGLE PAGE) DATA
  },

  mutations: {
    ///// LOGIN LOGOUT /////
    login(state) {
      if (state.isAuthed == false) {
        router.push('/login')

      } else if (state.isAuthed == true && state.logStatus == 'Logout') {
        state.isAuthed = false
        state.user = ''
        state.logStatus = 'Login'
        router.push('/')
        console.log('You have logged out :(')
      }
    },

    ///// AUTHENTICATION /////
    isAuthed(state, user) {
      if(state.isAuthed === false) {
        state.isAuthed = true
        state.user = user.name
        router.push('/')
        state.logStatus = 'Logout'
        console.log('You are logged in!')
        
      } else {return}
    },

    ///// ASSIGNING DATA TO shoppingList[] + MAKING FIRST PAGE /////
    getData(state, data) {
      state.pages = data.length/state.limit
      state.shoppingList = data
      state.pagedShoppingList = data.slice(0, state.limit)
      state.page = 1
      state.pageActive = 1
    },

    ///// SELECTING PAGE N. + FILLING PAGE DATA /////
    selectPagedData(state, page) {
      state.page = page
      state.pageActive = page
      state.pagedShoppingList = state.shoppingList.slice((page - 1) * state.limit, page * state.limit)
    },

    ///// NEXT ARROW (PAGINATION) /////
    nPage(state) {
        state.pagedShoppingList = state.shoppingList.slice(state.page * state.limit, (state.page + 1) * state.limit)
        state.page++
        state.pageActive = state.page
    },

    ///// PREVIOUS ARROW (PAGINATION) /////
    pPage(state) {
        if (state.page == 1) {
          state.pagedShoppingList = state.shoppingList.slice(0, state.limit )
        } else {
          state.page--
          state.pagedShoppingList = state.shoppingList.slice((state.page - 1) * state.limit, (state.page) * state.limit)
          state.pageActive = state.page
        }
    },

  },

  actions: {
    ///// FETCHING DATA FOR Me /////
    getData({commit}) {
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => commit('getData', data))
    },
    ///// FETCHING DATA FOR Wife /////
    getWifeData({commit}) {
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(wifeData => commit('getData', wifeData))
    },
  },
  modules: {
  }
})
