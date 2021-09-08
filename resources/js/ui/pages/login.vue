<template>
    <v-layout align-center justify-center fill-height>
        <v-card>
            <v-card-title primary-title>
                <v-layout column>
                    <v-layout row style="margin: 0px">
                        <v-col align-center>
                            <v-btn fill-width text @click="loginMode" color="cyan darken-1" style="text-transform: none !important;">Login</v-btn>
                        </v-col>
                        <v-col align-center>
                            <v-btn fill-width text @click="signUpMode" color="cyan darken-1" style="text-transform: none !important;">Sign Up</v-btn>
                        </v-col>
                    </v-layout>
                    <v-img height="230px" width="230px" style="border-radius: 50%;"
                        src="img/login-gray.png">
                        <template v-slot:placeholder>
                            <v-layout
                                fill-height
                                align-center
                                justify-center
                                ma-0
                            >
                                <v-progress-circular indeterminate color="black darken-5"></v-progress-circular>
                            </v-layout>
                        </template>
                    </v-img>
                    <v-form
                        ref="form"
                        lazy-validation
                        id="login_form"
                        method="POST"
                        @submit.prevent="loginOrSignUp"
                    >
                        <v-text-field
                            :value="username"
                            label="Username"
                            required
                            text-align="right"
                            name="username"
                            @input="setUsername"
                            data-vv-name="username"
                        ></v-text-field>

                        <v-text-field
                            :value="password"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            label="Password"
                            required
                            data-vv-name="password"
                            name="password"
                            @input="setPassword"
                            text-align="right"
                            @click:append="togglePassword"
                        ></v-text-field>

                        <v-layout column justify-center>
                            <v-btn dark color="cyan darken-1" type="submit">
                                <v-progress-circular v-show="this.pending === true" indeterminate
                                    color="white"></v-progress-circular>
                                <div v-show="this.pending === false">{{mode=== 'login'? 'Login' : 'signUp'}}</div>
                            </v-btn>

                            <transition name="slide-fade">
                                <p style="word-break: keep-all; width: 230px; margin: 14px 0 0 0; color: #FF8A80; font-size: 12px; text-align: center;" v-bind:class="{ good: msgGood }" v-show="isMsg">{{ msg }}</p>
                            </transition>
                        </v-layout>
                    </v-form>

                </v-layout>
            </v-card-title>
        </v-card>
    </v-layout>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";
    import router from '../../router';

    export default {
        name: "login",
        methods: {
            ...mapMutations({
                setUsername: 'login/setUsername',
                setPassword: 'login/setPassword',
                togglePassword: 'login/togglePassword',
                loginMode: 'login/loginMode',
                signUpMode: 'login/signUpMode',
                toggleMode: 'login/toggleMode'
            }),
            ...mapActions({
                loginOrSignUp: 'login/loginOrSignUp'
            }),
        },
        computed: {
            ...mapState({
                isLoggedIn: state => state.login.isLoggedIn,
                pending: state => state.login.pending,
                showPassword: state => state.login.showPassword,
                password: state => state.login.password,
                username: state => state.login.username,
                mode: state => state.login.mode,
                isMsg: state => state.login.isMsg,
                msgGood: state => state.login.msgGood,
                msg: state => state.login.msg,
            })
        }
    }
</script>

<style scoped>
    .slide-fade-enter-active {
        transition: all 1s ease;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateY(-30px);
        opacity: 0;
    }

    .good {
        color: #66BB6A !important;
        text-transform: uppercase;
    }
</style>
