import { createStore } from 'vuex'
import router from '../router/index'

export default createStore({
  state: {
    isAuthed: false,
    logStatus: 'Login',
    user: '',
    itemIndex: null,

    backupTitle: '',  //BACKUP TITLE BEFORE EDITING

    pages: null,      //TOTAL PAGES COUNT
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

    ///// TOGGLE STATUS /////
    changeStatus(state, itemIndex) {
      state.shoppingList[((state.page - 1) * state.limit) + itemIndex].completed =
       !state.shoppingList[((state.page - 1) * state.limit) + itemIndex].completed
    },

    ///// SELECT EDIT ITEM /////
    selectEditListItem(state, itemIndex) {
      state.itemIndex = ((state.page - 1) * state.limit) + itemIndex  // SELECTING ITEM INDEX IN shoppingList ARRAY
      if (state.shoppingList[state.itemIndex].completed == false) {
        state.backupTitle = state.shoppingList[state.itemIndex].title
      } else { 
        state.itemIndex = null
        return
       }
    },

    ///// EDIT ITEM /////
    editListItem(state, newTitle) {
      if(newTitle == '') {
          alert("You didn' add a task")
          state.shoppingList[state.itemIndex].title = state.backupTitle     // BACKUP YOUR LAST TITLE
          state.itemIndex = null
      } else {
          state.shoppingList[state.itemIndex].title = newTitle
          state.itemIndex = null
      }
    },

    ///// DELETE ITEM /////
    deleteListItem(state, itemIndex) {
      if(confirm('Are you sure ?')) {
        state.itemIndex = ((state.page - 1) * state.limit) + itemIndex
        console.log(state.itemIndex)
        //state.shoppingList = state.shoppingList.filter((list) => list.id != itemIndex) //HOW TO GET LIST.INDEX??
        var newList = []
        var z = 0
        for(z = 0; z < state.shoppingList.length; z++) {
          if(state.shoppingList[itemIndex] != state.shoppingList[z]) {
            newList.push(state.shoppingList[z])
          } 
        }
        state.shoppingList = newList
        state.pages = Math.ceil(state.shoppingList.length/state.limit)    //ROUND-UP
        state.pagedShoppingList = state.shoppingList.slice((state.page - 1) * state.limit, state.page * state.limit)
        state.itemIndex = null
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
