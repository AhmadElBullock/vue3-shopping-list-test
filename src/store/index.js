import { createStore } from 'vuex'
import router from '../router/index'

export default createStore({
  state: {
    isAuthed: false,
    logStatus: 'Login',
    user: '',
    edit: false,
    itemPageIndex: null,

    pages: null,    //TOTAL PAGES COUNT
    page: 1,          //THE SINGLE PAGE
    limit: 10,        //SINGLE PAGE SIZE (LIMIT OF DATA TO DISPLAY IN A SINGLE PAGE)

    pageActive: null,   // SELECT CURRENT ACTIVE PAGINATION (NUMBER)

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

    ///// ADD ITEM /////
    addListItem(state, newItem) {
      if(newItem == '') {
        alert('Please type a shopping list in the field')
        return
      } else {
      state.shoppingList.unshift(
        {
          'userId':1,
          'id': 1,
          title: newItem,
          completed: false
        })
        state.pages = Math.ceil(state.shoppingList.length/state.limit)    //ROUND-UP
        state.pagedShoppingList = state.shoppingList.slice(0, state.limit)
        state.page = 1
        state.pageActive = 1
        console.log('shoppingList.length :  ' + state.shoppingList.length, 'pages: ' + state.pages,state.shoppingList, )
      }
    },
    ///// SELECT EDIT ITEM /////
    selectEditListItem(state, itemPageIndex) {
      console.log(state.shoppingList[itemPageIndex])
      state.itemPageIndex = itemPageIndex
      state.edit = true
    },
    ///// EDIT ITEM /////
    editListItem(state, newTitle) {
      var itemIndex = (state.limit * state.page) - (state.limit - state.itemPageIndex) // THE ITEM POSITION (INDEX) FETCHED DATA
      console.log(state.itemPageIndex)
      //state.shoppingList = state.shoppingList.filter((list) => list.id != itemIndex) //HOW TO GET LIST.INDEX
      state.shoppingList[itemIndex].title = newTitle
      state.edit = false
      newTitle = ''
    },

    ///// DELETE ITEM /////
    deleteListItem(state, itemPageIndex) {
      var itemIndex = (state.limit * state.page) - (state.limit - itemPageIndex) // THE ITEM POSITION (INDEX) FETCHED DATA
      console.log(itemIndex)
      //state.shoppingList = state.shoppingList.filter((list) => list.id != itemIndex) //HOW TO GET LIST.INDEX
      var newList = []
      var z = 0
      for(z = 0; z < state.shoppingList.length; z++) {
        if(state.shoppingList[itemIndex] != state.shoppingList[z]) {
          newList.push(state.shoppingList[z])
        } 
      }
     state.shoppingList = newList
     state.pages = Math.ceil(state.shoppingList.length/state.limit)    //ROUND-UP
     state.pagedShoppingList = state.shoppingList.slice(0, state.limit)
     state.page = 1
     state.pageActive = 1  //MUST FIGURE OUT A WAY TO SHOW DATA WITHOUT REDIRECT TO FIRST PAGE
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
