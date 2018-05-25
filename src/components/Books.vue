<template>
    <div id="mybook">
        <div class="container page-content">
            <h2 class="mt-5">My Books</h2>
            {{items.results[1]}}
            <div class="mt-5">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cover</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Date Borrowed</th>
                        <th scope="col">Date Expired</th>
                        <th scope="col">Date Expired</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items.results">
                            <th scope="row">1</th>
                            <td>Cover Dummy</td>
                            <td>{{item.name}}</td>
                            <td>{{item.species}}</td>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td>xxx</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mybook',
    data() {
        return {
            items:{}
        }
    },
    methods: {
        fetchItems() {
            fetch('https://swapi.co/api/people', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(json => this.items = json)
        }
    },
    created(){
        this.fetchItems()
    }
}
</script>

<style>
</style>