<template>
    <v-container>
        <v-layout align-center justify-center column>
            <v-card
                text="Main table, contains all items"
                class="scroll-y"
                width="900px"
                align-center
                justify-center
            >
                  <v-data-table
                    :headers="headers"
                    :items="contracts"
                    :items-per-page="10"
                    class="elevation-1"
                    height="700px"
                >
                    <template v-slot:no-data >
                            <v-layout class="no-data" align-center justify-center column fill-height>
                                    No data
                            </v-layout>
                    </template>

                    <template v-slot:headers="{header}">                    <!-- Ne dela!! --->
                        <span class="font-weight-light text-success text--darken-3"
                            v-text="header.text"
                        ></span>
                    </template>

                    <template v-slot:item="{item}">
                        <tr>
                            <td>
                                <v-layout justify-center>
                                    <img v-if="cryptos[item.symbol]" class="mr-3" :src="'https://www.cryptocompare.com/'+cryptos[item.symbol]['USD']['IMAGEURL']" height="40px" />
                                </v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>
                                    {{ item.symbol }}
                                </v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>
                                    {{ item.coins }}
                                </v-layout>     
                            </td>
                            <td>
                                <v-layout justify-center>
                                    {{ "$"+item.initial_price }}
                                </v-layout>     
                            </td>
                            <td>
                                <v-layout justify-center>
                                    {{ "$"+Number(item.initial_price / item.coins).toFixed(2) }}
                                </v-layout>     
                            </td>
                            <td>
                                <v-layout justify-center>
                                    <p style="margin: 0;" v-if="cryptos[item.symbol]">{{ "$"+cryptos[item.symbol]['USD']['PRICE'] }}</p>
                                </v-layout>     
                            </td>
                            <td>
                                <v-layout justify-center>
                                    <p style="margin: 0;" v-if="cryptos[item.symbol]">{{ "$"+Number(item.coins * cryptos[item.symbol]['USD']['PRICE']).toFixed(2) }}</p>
                                </v-layout>     
                            </td>
                            <td>
                                <v-layout justify-center>
                                    <p style="margin: 0;" v-if="cryptos[item.symbol]">{{ Number((item.coins * cryptos[item.symbol]['USD']['PRICE'] / item.initial_price - 1) * 100).toFixed(2)+"%" }}</p>
                                </v-layout>
                            </td>
                            <td class="justify-center layout px-0">
                                <v-layout justify-center >
                                    <v-icon style="padding: 10px"
                                        small
                                        @click="editItem(item)"
                                    >
                                        edit
                                    </v-icon>
                                </v-layout>
                                
                                <v-layout justify-center>
                                    <v-icon style="padding: 10px"
                                        small
                                        @click="deleteItem(item)"
                                    >
                                        delete
                                    </v-icon>
                                </v-layout>

                                <v-layout justify-center >
                                    <v-icon style="padding: 10px"
                                        small
                                        @click="archiveItem(item)"
                                    >
                                        archive
                                    </v-icon>
                                </v-layout>
                            </td>
                        </tr> 
                    </template>

                    <!-- eslint-disable-next-line -->
                    <template v-slot:footer.page-text
                    >
                        <v-btn color="cyan darken-1" dark class="white--text" @click="addItem">New open order</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-layout>

        <v-dialog
            v-model="dataDialog"
            width="500"
            v-if="dataDialog"
        >
            <v-card 
                v-click-outside="onClickOutside"
            >
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field required @change="setSymbol" v-model="selectedItem.symbol" label="Symbol"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field required type="number" @change="setCoins" v-model="selectedItem.coins" label="Coins"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field required type="number" @change="setInitial_price" v-model="selectedItem.initial_price" label="Initial price (USD)"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="hideDataDialog(); readOpen_orders();" >Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="addOrEdit">
                        <v-progress-circular v-show="this.pending === true" indeterminate
                                            color="white"></v-progress-circular>
                        <div v-if="isEditMode === true" v-show="this.pending === false">Save</div>
                        <div v-if="isEditMode === false" v-show="this.pending === false">Add</div>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="deleteDialog"
            width="500"
            v-if="deleteDialog"
        >
            <v-card
                v-click-outside="onClickOutside"
            >
                <v-card-text>
                    Are you sure that you want to delete this open order?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="hideDeleteDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteOpen_order">
                        <v-progress-circular v-show="this.pending === true" indeterminate
                            color="white"></v-progress-circular>
                        <div v-show="this.pending === false">Delete</div>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="archiveDialog"
            width="500"
            v-if="archiveDialog"
        >
            <v-card
                v-click-outside="onClickOutside"
            >
                <v-card-text>
                    Are you sure that you want to archive this open order (it will be moved permanently to past trades)?

                    <v-container grid-list-md>
                    
                        <v-flex xs12 sm6 md4>
                            <v-text-field required @change="setSymbolFinal" v-model="selectedItemFinal.symbol" label="Symbol"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field required type="number" @change="setCoinsFinal" v-model="selectedItemFinal.coins" label="Coins"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field required type="number" @change="setInitial_priceFinal" v-model="selectedItemFinal.initial_price" label="Initial price (USD)"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field required type="number" @change="setFinal_price" v-model="selectedItemFinal.final_price" label="Final price (USD)"></v-text-field>
                        </v-flex>
                    
                    </v-container>
                </v-card-text>

                

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="hideArchiveDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="archiveOpen_order">
                        <v-progress-circular v-show="this.pending === true" indeterminate
                                            color="white"></v-progress-circular>
                        <div v-show="this.pending === false">Archive</div>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>


<script>
    import {mapActions, mapMutations, mapState} from "vuex";
/*
    function getFullCryptoCompareLink(crypto) {
            return "https://www.cryptocompare.com/"+crypto;
    };
*/
    export default {
        name: "contracts",
        
        methods: {
            ...mapMutations({
                setSymbol: 'open_orders/setSymbol',
                setSymbolFinal: 'open_orders/setSymbolFinal',
                setCoins: 'open_orders/setCoins',
                setCoinsFinal: 'open_orders/setCoinsFinal',
                setInitial_price: 'open_orders/setInitial_price',
                setInitial_priceFinal: 'open_orders/setInitial_priceFinal',
                setFinal_price: 'open_orders/setFinal_price',

                setOpen_order: 'open_orders/setOpen_order',
                setSelectedItem: 'open_orders/setSelectedItem',
                setSelectedItemFinal: 'open_orders/setSelectedItemFinal',
                setEditMode: 'open_orders/setEditMode',
                setPending: 'open_orders/setPending',
                hideDeleteDialog: 'open_orders/hideDeleteDialog',
                showDeleteDialog: 'open_orders/showDeleteDialog',
                hideDataDialog: 'open_orders/hideDataDialog',
                showDataDialog: 'open_orders/showDataDialog',
                hideArchiveDialog: 'open_orders/hideArchiveDialog',
                showArchiveDialog: 'open_orders/showArchiveDialog',

            }),
            ...mapActions({
                readOpen_orders: 'open_orders/readOpen_orders',
                addOrEdit: 'open_orders/addOrEdit',
                deleteOpen_order: 'open_orders/deleteOpen_order',
                archiveOpen_order: 'open_orders/archiveOpen_order',
            }),
            editItem (item) {
                this.setSelectedItem(item);
                this.setEditMode(true);
                this.showDataDialog();
            },
            addItem () {
                this.setSelectedItem ({ symbol: '', coins: '', initial_price: '' }) ;
                this.setEditMode(false);
                this.showDataDialog();
            },
            deleteItem (item) {
                this.setSelectedItem(item);
                this.showDeleteDialog()
            },
            archiveItem (item) {
                this.setSelectedItemFinal(item);
                this.showArchiveDialog();
            },

            onClickOutside(event) {
                //console.log('Clicked outside. Event: ', event)
                this.hideDataDialog();
                this.hideDeleteDialog();
                this.hideArchiveDialog();
                this.readOpen_orders();
            },

        // Code below is for onClickOutside() 
            handler (event) {
                console.log('Clicked outside (Using config), middleware returned true :)')
            },
            // Note: The middleware will be executed if the event was fired outside the element.
            //       It should have only sync functionality and it should return a boolean to
            //       define if the handler should be fire or not
            middleware (event) {
                return event.target.className !== 'modal'
            },
        },
        mounted: function () {
            this.readOpen_orders();
        },
        data(){
            return {
                headers: [
                    {
                        text: 'Icon',
                        value: 'icon',
                        align: 'center',
                    },
                    {
                        text: 'Symbol',
                        value: 'symbol',
                        align: 'center',
                    },
                    {   
                        text: 'Coins', 
                        value: 'coins',
                        align: 'center',
                    },
                    {
                        text: 'Initial price (USD)',
                        value: 'initial_price',
                        align: 'center',
                    },
                    {
                        text: 'Initial price per coin (USD)',
                        value: 'initial_price_per_coin',
                        align: 'center',
                    },
                    {
                        text: 'Current price per coin (USD)',
                        value: 'current_price_per_coin',
                        align: 'center',
                    },
                    {
                        text: 'Value of coins (USD)',
                        value: 'value_of_coins',
                        align: 'center',
                    },
                    {
                        text: 'Gains/Loss (%)',
                        value: 'change',
                        align: 'center',
                    },
                ],
            }
        },
        computed: {
            ...mapState({
                contracts: state => state.open_orders.contracts,
                cryptos: state => state.open_orders.cryptos,
                errors: state => state.open_orders.errors,
                pending: state => state.open_orders.pending,
                selectedItem: state => state.open_orders.selectedItem,
                selectedItemFinal: state => state.open_orders.selectedItemFinal,
                isEditMode: state => state.open_orders.isEditMode,
                dataDialog: state => state.open_orders.dataDialog,
                deleteDialog: state => state.open_orders.deleteDialog,
                archiveDialog: state => state.open_orders.archiveDialog,
            })

        },
        watch: {
            // watch Vue elements on change
            dataDialog: function (val) {
                //!val && alert("Data dialog change.")
                //this.hideDataDialog()
            }


        }
    }
</script>


<!-- 700 - 56 -->
<style>
    div.no-data {
        height: 642px !important;
    }
</style>