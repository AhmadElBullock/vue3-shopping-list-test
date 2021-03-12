<template>
  <div>
      <table class="table table-striped">

        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">USER</th>
            <th scope="col">TITLE</th>
            <th scope="col">COMPLETED</th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="list in this.$store.state.pagedShoppingList" :key="list.id">
            <th scope="row">{{list.id}}</th>
            <td>{{list.userId}}</td>
            <td>{{list.title}}</td>
            <td>{{list.completed}}</td>
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
</style>