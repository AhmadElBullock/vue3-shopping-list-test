<template>
<div class="container text-center">
    <h1>404</h1>
    <button class="btn btn-outline-success" @click="back">Back</button>
</div>
  
</template>

<script>
export default {
    methods: {
        back () {
            this.$router.push({path: '/'})
        },
    }
}
</script>

<style scoped>
    h1 {
        font-size: 20rem;
        margin: 3rem auto 0;
    }
    button {
        font-size: 2rem;
        padding: 1rem 2rem
    }
</style>