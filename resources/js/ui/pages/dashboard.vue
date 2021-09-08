<template>
    <section class="section">
        <!-- eslint-disable-next-line -->
        <div class="box" v-for="item in news">
             <v-card style="margin: 20px">
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="12" sm="6" md="4">
                      <v-img width="90%" class="mx-4" v-bind:src="item.imageurl"></v-img>
                    </v-col>
                    <v-col cols="6" md="8">
                    <v-flex>
                      <v-layout column>
                        <v-flex class="caption">
                          <a class="title is-link" v-bind:href="item.guid" target="_blank">{{item.title}}</a>
                        </v-flex>
                        <v-flex>{{ String(item.body).replace("/(\[&#8230;\])/g", '') }}</v-flex>
                        <v-flex><strong><cite>{{item.source}}</cite></strong></v-flex>
                      </v-layout>
                    </v-flex>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
             </div>
      </section>
</template>

<script>
    import axios from 'axios'
    export default {
    name: 'news',
    data: () => ({
        news: [],
        errors: []
    }),
    created () {
        const instance = axios.create({
            transformRequest: [(data, headers) => {
                delete headers.common['X-CSRF-TOKEN'];
                delete headers.common['X-Requested-With'];
                return data;
            }]
        });

        instance.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN').then(response => {
            this.news = response.data.Data
            //console.log(response.data.Message) // This will give you access to the full object
        }).catch(e => {
            this.errors.push(e)
        })
    }
}
</script>

<style scoped>

</style>