<template>
    <div id="auth">
    
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6 col-md-offset-3">
                    <div class="panel panel-login">
                        <div class="panel-heading">
                            <div v-if="state == 0" class="row justify-content-center align-items-center pt-4">
                                <div class="col-xs-6 px-3">
                                    <a href="#" class="active" id="login-form-link" v-on:click="state = 0">Login</a>
                                </div>
                                <div class="col-xs-6 px-3">
                                    <a href="#" id="register-form-link" v-on:click="state = 1">Register</a>
                                </div>
                            </div>
                            
                            <div v-else class="row justify-content-center align-items-center pt-4">
                                <div class="col-xs-6 px-3">
                                    <a href="#" id="login-form-link" v-on:click="state = 0">Login</a>
                                </div>
                                <div class="col-xs-6 px-3">
                                    <a href="#" class="active" id="register-form-link" v-on:click="state = 1">Register</a>
                                </div>
                            </div>
                        </div>
                        <hr class="h-1">
                        <div class="panel-body pt-3">
                            <div class="row justify-content-center">
                                <div class="col-lg-10">
                                    <form id="login-form" action="" method="post" role="form" v-if="state == 0">
                                        <div class="form-group">
                                            <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Email" value="">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
                                        </div>
                                        <div class="form-group text-center">
                                            <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
                                            <label for="remember"> Remember Me</label>
                                        </div>
                                        <div class="form-group">
                                            <div class="row justify-content-center">
                                                <div class="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="text-center">
                                                        <a href="" tabindex="5" class="forgot-password">Forgot Password?</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    
                                    <form id="register-form" @submit="createAccount" action="/auth" method="post" role="form" v-else>
                                        <div v-if="pass_not_match" class="alert alert-danger" role="alert">
                                            Password not match!
                                        </div>

                                        <div v-if="reg_status === 1" class="alert alert-success" role="alert">
                                            Account registered successfully!
                                        </div>
                                        <div v-else-if="reg_status === 2" class="alert alert-success" role="alert">
                                            Registration failed!
                                        </div>
                                        <p v-if="errors.length">
                                            <b>Please correct the following error(s):</b>
                                            <ul>
                                            <li v-for="error in errors">{{ error }}</li>
                                            </ul>
                                        </p>

                                        <div class="form-group">
                                            <input v-model="email" type="text" name="email" id="email" tabindex="1" class="form-control" placeholder="Email" value="">
                                        </div>
                                        <div class="form-group">
                                            <input v-model="name" type="text" name="name" id="name" tabindex="1" class="form-control" placeholder="Name" value="">
                                        </div>
                                        <div class="form-group">
                                            <input v-model="password" type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
                                        </div>
                                        <div class="form-group">
                                            <input v-model="password2" type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password">
                                        </div>
                                        <div class="form-group">
                                            <div class="row justify-content-center pb-5 pt-3">
                                                <div class="col-sm-6 col-sm-offset-3">
                                                    <input type=submit name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now"></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
// import router from 'vue-router'
export default {
    name: 'auth',
    data() {
        return{
            state: 0,
            name: null,
            email: null,
            password: null,
            password2: null,
            pass_not_match: false,
            reg_status: 0,
            errors: []
        }
    },
    methods: {
        checkForm(e) {
            this.errors = [];
            if(!this.name) this.errors.push("Name required.");
            if(!this.email) {
                this.errors.push("Email required.");
            } else if(!this.validEmail(this.email)) {
                this.errors.push("Valid email required.");        
            }
            if(!this.password || !this.password2) this.errors.push("Password required.");
            if(this.password !== this.password2) this.errors.push("Password not match.");
            if(!this.errors.length) return true;
            else return false;
            e.preventDefault();
        },

        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        createAccount(e) {
            this.checkForm(e);
            if(!this.errors.length){
                //http://192.168.119.176:3000/login
                var root = 'http://192.168.137.133:3000';
                var url = root + '/register';
                var res_status = 200;
                const self = this;

                axios.post(url, {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                .then(function (response) {
                    console.log(response.status);
                    
                    if(response.status == '200'){
                        console.log("tes")
                        self.reg_status = 1;
                        self.name = null;
                        self.password = null;
                        self.password2 = null;
                        self.email = null;
                        self.$router.push("/auth");
                    }else{
                        self.reg_status = 2;
                        self.name = null;
                        self.password = null;
                        self.password2 = null;
                        self.email = null;
                        self.$router.push("/auth");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });                         
                
            }
            e.preventDefault();
        },

        login() {

        }
    }
}

</script>

<style scoped>
body {
    padding-top: 90px;
}
.h-1{
    width: 90%;
}
.panel-login {
	border-color: #ccc;
	-webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	-moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
}
.panel-login>.panel-heading {
	color: #00415d;
	background-color: #fff;
	border-color: #fff;
	text-align:center;
}
.panel-login>.panel-heading a{
	text-decoration: none;
	color: #666;
	font-weight: bold;
	font-size: 15px;
	-webkit-transition: all 0.1s linear;
	-moz-transition: all 0.1s linear;
	transition: all 0.1s linear;
}
.panel-login>.panel-heading a.active{
	color: #029f5b;
	font-size: 18px;
}
.panel-login>.panel-heading hr{
	margin-top: 10px;
	margin-bottom: 0px;
	clear: both;
	border: 0;
	height: 1px;
	background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
	background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}
.panel-login input[type="text"],.panel-login input[type="email"],.panel-login input[type="password"] {
	height: 45px;
	border: 1px solid #ddd;
	font-size: 16px;
	-webkit-transition: all 0.1s linear;
	-moz-transition: all 0.1s linear;
	transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
	outline:none;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
	border-color: #ccc;
}
.btn-login {
	background-color: #59B2E0;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #59B2E6;
}
.btn-login:hover,
.btn-login:focus {
	color: #fff;
	background-color: #53A3CD;
	border-color: #53A3CD;
}
.forgot-password {
	text-decoration: underline;
	color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
	text-decoration: underline;
	color: #666;
}

.btn-register {
	background-color: #1CB94E;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
	color: #fff;
	background-color: #1CA347;
	border-color: #1CA347;
}

</style>