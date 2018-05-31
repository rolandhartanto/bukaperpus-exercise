<template>
    <div id="mybook">
        <div class="container page-content">
            <h2 class="mt-5">My Books</h2>
            <div class="mt-5" style="overflow-x:auto">
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
                            <td :id="'datetime_b' + index">{{item.borrowed_at | moment("MMMM Do YYYY, kk:mm")}}</td>
                            <td :id="'datetime_r' + index">{{item.expired_at | moment("MMMM Do YYYY, kk:mm")}}</td>
                            <td><button v-on:click="returnBook(item.borrow_id)" class="btn btn-return">Return Book</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import moment from 'vue-moment'

export default {
    name: 'mybook',
    data() {
        return {
            items:{},
            root_url: this.$store.state.base.url_root
        }
    },
    methods: {
        fetchItems() {
            axios.get(this.root_url + '/books/borrowed/').then(response => {
                return response.data
            }).then(json => this.items = json)
        },
        returnBook(id) {
            console.log(id)
            var self = this
            axios.post(this.root_url + '/books/return', {
                borrow_id: id,
            }).then(response => {
                self.fetchItems()
            })
        },
        moment() {
            return this.$moment();
        }
        // formatDate(){
        //     for(var i = 0; i < this.items.length; i++){
        //         var date_borrow = document.getElementById("datetime_b" + i).innerHTML
        //         var date_return = document.getElementById("datetime_r" + i).innerHTML

        //         var formatted = new Date(date_borrow)
        //         document.getElementById("datetime_b" + i).innerHTML = formatted
        //         console.log(formatted)
        //         formatted = new Date(date_return)
        //         document.getElementById("datetime_b" + i).innerHTML = formatted
        //         console.log(formatted)
        //     }
        // }
    },
    created(){
        this.fetchItems()
        // this.formatDate()
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