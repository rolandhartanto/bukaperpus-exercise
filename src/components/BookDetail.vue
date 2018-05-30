<template>
    <div id="book-detail">
        <div class="container page-content">
            <h2 class="mt-5">{{item.title}}</h2>
            <div class="row details">
                <div class="mr-5"> 
                    <div class="detail-picture">
                        <img class="detail-picture" :src="root_url + item.cover"/>
                    </div>
                    <div>
                        <a href="" class="btn btn-primary mt-3 btn-block">+ Add to Borrow List</a>
                        <div class="row ml-0 mt-3">
                            
                            <div v-if="(parseInt(id.toString())-1) >= 1">
                                <a :href="'/detail/'+ (parseInt(id.toString())-1)" class="btn btn-back"> < Prev</a>
                            </div>
                            <div v-else>
                                <a :href="'/detail/' + book_count" class="btn btn-back"> < Prev</a>
                            </div>

                            <div class="ml-2" v-if="(parseInt(id.toString())+1) <= book_count">
                                <a :href="'/detail/' + (parseInt(id.toString())+1)" class="btn btn-back"> Next ></a>
                            </div>
                            <div class="ml-2" v-else>
                                <a href="/detail/1" class="btn btn-back"> Next ></a>
                            </div>
                        </div>
                    </div>
                    <div >
                        <!-- id batasin sejumlah total buku -->
                        
                    </div>
                </div>
                <div class="detail-content">
                    <table class="mt-3">
                        <col width="100">
                        <col width="15">
                        <col width="500">
                        <tr>
                            <td class="description-table"><b>Author</b></td>
                            <td> : </td>
                            <td>{{item.author}}</td>
                        </tr>
                        <tr>
                            <td class="description-table"><b>Stock</b></td>
                            <td class="description-table"> : </td>
                            <td>{{item.stock}} available</td>
                        </tr>
                    </table>
                    <div>
                        <h5 class="mt-3">Synopsys</h5>
                        <div class="desc-text">
                        {{item.synopsis}}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            item: {},
            book_count: 0,
            root_url: this.$store.state.base.url_root
        }
    },
    methods: {
        fetchBookDetail() {
            var root_url = this.$store.state.base.url_root;
            var url = root_url + '/books/' + this.id; 
            var url_all_books = root_url + '/books/'; 

            //perlu dioptimasi biar ga request terus
            fetch(url_all_books, {
                method: 'GET',
            }).then((response) => {
                return response.json();
            }).then(json => this.book_count = json.length);

            fetch(url, {
                method: 'GET',
            }).then((response) => {
                return response.json();
            }).then(json => this.item = json);
        }
    },
    created() {
        this.fetchBookDetail()
    }
}
</script>

<style>
.details{
    margin-top: 40px;
    margin-left: 0px;
}

.detail-content {
    width: 70%
}

.detail-picture {
    width: 200px;
}

.description-table{
    vertical-align: text-top;
}

.desc-text{
    width: 90%
}

.btn-back{
    background-color: #CCCCCC;
    color: black;
}

.btn-back:hover{
    background-color: #AAAAAA;
    color: white;
}
</style>