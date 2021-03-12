<template>
  <div class="container">
      <div class="row">

          <div class="col-md-6">
              <h1>Shopping List App</h1>
              <p>Please enter your username and password</p>
              <button class="btn btn-outline-success" @click="back">Back</button>
          </div>

          <div class="col-md-6">
            <form>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input v-model="name" type="text" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control">
                </div>
                    <button @click="onSubmit" type="button" class="btn btn-success">Submit</button>
            </form>
          </div>

      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        onSubmit () {
            const userName = this.name.toLowerCase()
            console.log(userName)
            if((
                userName == 'admin' ||
                userName == 'ahmad' ||
                userName == 'zahlan' ||
                userName == 'ghandor'
                )
                && this.password == 'admin') {
                const user = {
                    name : userName.charAt(0).toUpperCase() + userName.slice(1),  //JUST TO CAPITALIZE THE FIRST LETTER
                    password : this.password
                }
                this.$store.commit('isAuthed', user)
            } else {
                alert('NOT AUTHORIZED !!!!')
                this.name = ''
                this.password = ''
            }
        },
        back () {
            this.$router.push({path: '/'})
        },
    },
}
</script>

<style scoped>
     h1 {
        color: rgb(32 143 123) !important
    }
    .row {
        margin-top: 6rem
    }
</style>