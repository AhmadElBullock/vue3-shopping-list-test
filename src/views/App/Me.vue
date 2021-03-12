<template>
    <div class="container">
      <h3 v-if="$store.state.user == 'admin' || $store.state.user.length < 1">My Shopping List</h3>
      <h3 v-else-if="$store.state.user.length > 0">{{$store.state.user}}'s Shopping List</h3>
      <ShoppingList />
    </div>
</template>

<script>
import ShoppingList from '../../components/ShoppingList'

export default {
      components: {
      ShoppingList
    },
      mounted() {
        this.$store.dispatch('getData')
        console.log('mounted: Me')
    },
}
</script>

<style>
  h3 {
    margin: 0.7rem auto;
  }
  li {
    cursor: pointer;
  }
</style>