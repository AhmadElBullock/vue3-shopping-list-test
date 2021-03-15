<template>
  <div>
    <!-- ----- ADD A SHOPPING LIST ITEM ----- -->
    <div class="row">

      <p>
        <button class="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdd" aria-expanded="false" aria-controls="collapseAdd">
          Add a shopping list item
        </button>
      </p>
      
      <div class="collapse" id="collapseAdd">
        <div class="card card-body">
          <div class="col-md-10">
            <div class="row">
              <div class="col-sm-4 col-form-label">
                <button class="btn btn-outline-success" @click="addListItem">Add</button>
              </div>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="newItem">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- ----- END: ADD A SHOPPING LIST ITEM ----- -->

    <!-- ----- TABLE  ----- -->
    <table class="table table-striped">
        <!-- ----- TABLE HEADER ----- -->
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">USER</th>
            <th scope="col">TITLE</th>
            <th scope="col">COMPLETED</th>
            <th scope="col"></th>
            <th scope="col"></th>
            </tr>
        </thead>

        <!-- ----- TABLE BODY ----- -->
        <tbody >  
            <tr v-for="(list, index) in this.$store.state.pagedShoppingList"
            :key="list.id"
            >
                <!-- INDEX -->
                <th scope="row">{{(($store.state.page - 1) * $store.state.limit) + index + 1}}</th>
                <!-- ID -->
                <td scope="row">{{list.id}}</td>
                <!-- USER ID -->
                <td>{{list.userId}}</td>

                <!-- TITLE & HIDDEN INPUT TITLE -->
                <td :class="[list.completed ? 'completed' : '']">
                    <div @dblclick="selectEditListItem(index)"
                    :class="[((($store.state.page - 1) * $store.state.limit) + index) != $store.state.itemIndex ? '' : 'hidden-text']"
                    >
                        {{list.title}}
                    </div>
                    <input 
                    type="text" class="edit-input"
                    :class="[((($store.state.page - 1) * $store.state.limit) + index) == $store.state.itemIndex ? '' : 'hidden-input', 'edit-input']"
                    v-model="list.title"
                    @keyup.enter="editListItem(list.title)"
                    @blur="editListItem(list.title)"
                    />
                </td> 

                <!-- STATUS -->
                <td>{{list.completed}}</td>
                <!-- EDIT BUTTON  -->
                <td>
                    <button v-if="((($store.state.page - 1) * $store.state.limit) + index) != $store.state.itemIndex && !$store.state.shoppingList[((($store.state.page - 1) * $store.state.limit) + index)].completed"

                    class="btn btn-info" @click="selectEditListItem(index)"
                    >
                      Edit
                    </button>
                    <button
                    v-if="((($store.state.page - 1) * $store.state.limit) + index) == $store.state.itemIndex"
                    class="btn btn-success"
                    @click="editListItem(list.title)"
                    >Done</button>
                </td>
                <!-- DELETE BUTTON -->
                <td>
                    <button class="btn btn-danger" @click="deleteListItem(index)">X</button>
                </td>
            </tr>
        </tbody>

    </table>
    <!-- ----- END: TABLE  ----- -->

    <!-- ----- PAGINATION ----- -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <!-- << ARROW -->
        <li v-show="$store.state.page > 1" class="page-item" @click="pPage">
          <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- PAGE -->
        <li class="page-item"
        v-for="page in $store.state.pages"
        :key="page"
        v-show="!(page >= $store.state.pageActive + 3) && !(page <= $store.state.pageActive - 3)"
        @click="selectPagedData(page)"
        >
            <a class="page-link" :class="$store.state.pageActive == page && 'isActive' ">
              {{page}}
            </a>
        </li>
        <!-- >> ARROW -->
        <li v-show="$store.state.page < $store.state.pages" class="page-item" @click="nPage" >
          <a class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- END PAGINATION -->
  </div>
</template>

<script>
export default {
    methods: {
      addListItem() {
        this.$store.commit('addListItem', this.newItem)
        this.newItem = ''
      },
      selectEditListItem(itemIndex) {
        this.$store.commit('selectEditListItem', itemIndex)
      },
      editListItem(itemIndex) {
        this.$store.commit('editListItem', itemIndex)
      },
      deleteListItem(itemIndex) {
        this.$store.commit('deleteListItem', itemIndex)
      },
      selectPagedData(page) {
        this.$store.commit('selectPagedData', page)
      },
      pPage() {
        this.$store.commit('pPage')
      },
      nPage() {
        this.$store.commit('nPage')
      }
    },
}
</script>

<style>
.black {
  background-color: rgba(0, 0, 0, 0.39) !important;
}
.page-link {
  color: black
}
.isActive {
  background-color: #247b6a;
  color: white
}
.isActive:hover {
  background-color: #247b6ab4;
  color: white
}
.completed {
  text-decoration:line-through !important;
  color: rgb(151, 151, 151) !important
}
.hidden-input {
  display: none;
}
.hidden-text {
  display: none;
}
.hide {
  display: none;
}
.show {
  display: block;
}
.edit-input {
  width: 100%;
  text-align: center;
  border: 1px solid rgba(128, 128, 128, 0.322);
  background-color: transparent;
}
</style>