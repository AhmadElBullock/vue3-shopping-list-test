<template>
    <div class="container text-center">
        <h1>SHOPPING LIST</h1>
        <router-link to="/app/me">Me</router-link>
        <router-link to="/app/wife">Wife</router-link>
        <router-view/>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    h1 {
        font-size: 3rem;
        margin: 1rem auto
    }
    a {
        color: #000;
        font-size: 1.5rem;
        text-decoration: none;
        padding: 0.25rem 2rem;
        background-color: #ffffff;
        border-radius: 4px;
        margin-right: 20px;
        border: 1px solid gray
    }
    .router-link-active {
        color: #f2f2f2 !important;
        background-color: #40b29c !important;
        border: 1px solid rgb(128, 128, 128, 50%)
    }
</style>
