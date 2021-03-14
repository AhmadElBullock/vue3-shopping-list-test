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
<!-- <div v-if="$store.state.edit">
    <input  type="text" v-model="newTitle" />
    
</div> -->
      <table class="table table-striped">

        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">USER</th>
            <th scope="col">TITLE</th>
            <!-- <th scope="col"></th> -->
            <th scope="col">COMPLETED</th>
            <th scope="col"></th>
            <th scope="col"></th>

            </tr>
        </thead>
        <tbody >  
            <tr v-for="(list, index) in this.$store.state.pagedShoppingList"
            :key="list.id"
            >
                <th scope="row">{{(($store.state.page - 1) * $store.state.limit) + index + 1}}</th>
                <td scope="row">{{list.id}}</td>
                <td>{{list.userId}}</td>

                <td :class="[list.completed ? 'completed' : '']">
                
                <div @dblclick="selectEditListItem(index)" :class="[$store.state.edit ? 'hidden-text' : '']">
                    {{list.title}}
                </div>
                <div :class="[!$store.state.edit ? 'hidden-input' : '', 'edit-input']">
                    <input type="text" v-model="list.title" @keyup.enter="editListItem(list.title)" @blur="editListItem(list.title)">
                </div>
                </td>

                <td>{{list.completed}}</td>
                <td>
                    <button v-if="!$store.state.edit" class="btn btn-info" @click="selectEditListItem(index)">Edit</button>
                    <button
                    v-if="$store.state.edit"
                    class="btn btn-success"
                    @click="editListItem(list.title)"
                    >Done</button>
                </td>
                <td>
                    <button class="btn btn-danger" @click="deleteListItem(index)">X</button>
                </td>
            </tr>
        </tbody>

    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li v-show="$store.state.page > 1" class="page-item" @click="pPage">
          <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item"
        v-for="page in $store.state.pages"
        :key="page"
        @click="selectPagedData(page)"
        >
          <a class="page-link" :class="$store.state.pageActive == page && 'isActive' ">
            {{page}}
            </a>
        </li>

          <li v-show="$store.state.page < $store.state.pages" class="page-item" @click="nPage" >
            <a class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

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
      editListItem(itemPageIndex) {
        this.$store.commit('editListItem', itemPageIndex)
      },
      deleteListItem(itemPageIndex) {
        this.$store.commit('deleteListItem', itemPageIndex)
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
    }
}
</script>

<style>
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
/* .edit {
  border-color: brown;
} */
.hidden-input input {
  display: none
}
.hidden-text {
  display: none;
}
.edit-input input {
  width: 100%;
  text-align: center;
  border: none;
  background-color: transparent;
  color: red
}
</style>