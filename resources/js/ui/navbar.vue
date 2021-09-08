<template>
    <nav style="position: sticky; top: 0px; z-index: 1;">
        <v-toolbar text>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-app-bar-nav-icon v-on="on" class="grey--text"></v-app-bar-nav-icon>
                </template>
                <!-- <v-navigation-drawer v-model="drawer" temporary class="side-navigation-drawer" height="144px" width="218px"> -->
                <v-list nav dense>
                    <v-list-item-group active-class="cyan--text text--darken-1">
                        <v-list-item to="/dashboard">
                            <v-list-item-icon>
                                <v-icon>mdi-view-dashboard-variant-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Dashboard</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/open_orders">
                            <v-list-item-icon>
                                <v-icon>mdi-file-document-edit-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Open orders</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/past_trades">
                            <v-list-item-icon>
                                <v-icon>mdi-file-document-edit-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Past trades</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/login">
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Login/Register</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <!-- </v-navigation-drawer> -->
            </v-menu>

            <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Crypto</span>
            <span>Gains</span>
            </v-toolbar-title>
            
            <v-spacer></v-spacer>
        
            <v-btn @click="logout" v-show="this.isLoggedIn === true && this.$route.name !== 'login'" text dark color="cyan darken-1">
                <v-progress-circular v-show="this.pending === true" indeterminate
                    color="white"></v-progress-circular>
                <span v-show="this.pending === false">Logout</span>
                <v-icon v-show="this.pending === false" right>logout</v-icon>
            </v-btn>

            <v-btn to="/login" v-show="this.isLoggedIn === false && this.$route.name !== 'login'" text color="cyan darken-1">
                <span>Login</span>
                <v-icon right>login</v-icon>
            </v-btn>
        </v-toolbar>
    </nav>

</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        computed: mapState({
            isLoggedIn: state => state.login.isLoggedIn,
            pending: state => state.login.pending,
        }),
        methods: mapActions({
            logout: 'login/logout',
        }),
    }
</script>

<style scoped>

</style>