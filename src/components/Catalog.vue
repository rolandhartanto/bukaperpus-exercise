<template>
    <div id="catalog">
        <div class="container page-content">
            <h2 class="mt-5">Books</h2>
            <div class="row justify-content-center">
                <div class="col-lg-6 mt-4">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search Book ...">
                        <span class="input-group-btn ml-2">
                            <button class="btn btn-secondary" type="button">Search</button>
                        </span>
                    </div>
                </div>
            </div>

            <div class="container row mt-5">
                <div v-for="item in items" class="card" style="width: 220px;">
                    <img class="card-img-top" :src="root_url + item.cover">
                    <div class="card-body">
                        <a :href="'/detail/' + item.id" class="book-title"><h6 class="card-title">{{item.title}}</h6></a>
                        <div>
                            <span class="card-text book-description-content book-description"><b>by {{item.author}}</b></span> 
                        </div>
                        <div>
                            <span class="card-text book-description-content book-description"><b>Stock</b> : {{item.stock}}</span> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'catalog',
    data() {
        return {
            items: [],
            root_url: 'http://192.168.119.176:3000/'            
        }
    },
    methods: {
        fetchItems() {
            var root_url = 'http://192.168.119.176:3000/';

            fetch(root_url + 'books', {
                method: 'GET',
            }).then((response) => {
                return response.json();
            }).then(json => this.items = json)
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>

<style>
.card{
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.book-title{
    color: black;
}

.book-description{
    font-size: 13px;
}

.book-description-tag{
    color: #666666;
}

.book-description-content{
    color: #999999;
}
</style>