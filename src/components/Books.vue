<template>
    <div id="mybook">
        <div class="container page-content">
            <h2 class="mt-5">My Books</h2>
            <div class="mt-5">
                <table class="table table-mybook">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cover</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Date Borrowed</th>
                        <th scope="col">Date Expired</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items">
                            <th scope="row">{{index + 1}}</th>
                            <td><img class="little-cover" :src="root_url + item.cover" /></td>
                            <td>{{item.title}}</td>
                            <td>{{item.author}}</td>
                            <td class="date">{{item.borrowed_at}}</td>
                            <td class="date">{{item.expired_at}}</td>
                            <td><button v-on:click="returnBook(item.id)" class="btn btn-return">Return Book</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'mybook',
    data() {
        return {
            items:{},
            root_url: this.$store.state.base.url_root,
            id_return: null
        }
    },
    methods: {
        fetchItems() {
            axios.get(this.root_url + '/books/borrowed/').then(response => {
                return response.data
            }).then(json => this.items = json)
        },
        formatDate() {
            
        },
        returnBook(id) {
            console.log(id)
            var self = this
            axios.get(this.root_url + '/books/' + id + "/return").then(response => {
                self.fetchItems()
            })
        }
    },
    created(){
        this.fetchItems()
        this.formatDate()
    }
}
</script>

<style>
.little-cover{
    width: 50px;
}

.btn-return{
    background-color: #CCCCCC;
    color: black;
}

.table-mybook{
    width: 1050px;
}
</style>