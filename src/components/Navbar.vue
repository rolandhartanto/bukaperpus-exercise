<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand ml-5" href="/catalog">VirtuLib</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto mr-5">
                <a class="nav-item nav-link" href="/catalog">Catalog <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="/mybook">My Book</a>
                <a v-if="!is_authenticated" class="nav-item nav-link" href="/auth">Login</a>
                <a v-else class="nav-item nav-link" href="/auth" v-on:click="logout">Logout</a>
            </div>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'navbar',
    data() {
        return {
            is_authenticated: false
        }
    },
    methods: {
        isAuthenticated() {
            var self = this
            if(localStorage.getItem('user-token')){
                axios.get(self.$store.state.base.url_root + '/auth').then((response) => {
                    if(response.data.message == 'ok'){
                        return true
                    }
                }).then((authenticated) => {
                    if (authenticated) {
                        self.is_authenticated = true
                        return
                    }else{
                        self.is_authenticated = false
                    }
                })
            }
        },
        logout() {
            this.$store.dispatch('AUTH_LOGOUT')
            .then(() => {
                this.$router.push('/auth')
            })
        }
    },
    created() {
        this.isAuthenticated()
    }
}
</script>

<style>
</style>