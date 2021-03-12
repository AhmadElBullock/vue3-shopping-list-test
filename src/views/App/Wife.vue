<template>
    <div class="container">
      <h3 v-if="$store.state.user == 'admin' || $store.state.user.length < 1">My Wife Shopping List</h3>
      <h3 v-else-if="$store.state.user.length > 0">{{$store.state.user}}'s Wife Shopping List</h3>
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
        this.$store.dispatch('getWifeData')
        console.log('mounted: Wife')
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