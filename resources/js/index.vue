<template>
    <v-app  id="inspire">
        <Navbar />

        <v-main>
            <router-view></router-view>
        </v-main>

    </v-app>
</template>

<script>
    import Navbar from './ui/navbar'

    export default {
        components: { Navbar },
        name: 'App',

        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
