<template>
  <div class="home jumbotron">
    <h1 class="my-4">Welcome to Shopping List app</h1>
    <p>
      <router-link to="/app" class="link" v-if="$store.state.isAuthed">
        Go to Shopping List
      </router-link>
    </p>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>
  .link {
    font-size: 1.5rem;
    text-decoration: none;
    padding: 0.2rem 0.5rem 0.5rem 0.5rem;
    border-radius: 4px;
    color: #000;
    background-color: #ace4da;
  }
</style>
