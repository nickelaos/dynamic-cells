<template>
    <div class="cell">
        <h3 class="cell-title">Cell #{{localData.id}}</h3>
        <form @submit.prevent="save">
            <input type="number" class="input-field" v-model="localData.number" :disabled="localData.disabled">
            <label>
                <input type="checkbox" class="input-checkbox" v-model="localData.disabled">Disable input field
            </label>
            <button type="submit" class="submit-button" v-show="showButton">SAVE</button>
        </form>
    </div>
</template>

<script>

    export default {
        name: 'Cell',
        props: {
            /**
             * Cell data passed from Vuex store.
             * */
            cell: {
                type: Object,
                default: function(){
                    return {
                        id: null,
                        number: null,
                        disabled: false
                    }
                }
            }
        },
        data(){
            return {
                /**
                 * Initialize a local model for cell data: `cell` prop cannot be used as model
                 * because Vuex state prevents direct changes (outside the mutation).
                 * */
                localData: {
                    id: null,
                    number: null,
                    disabled: false
                }
            }
        },
        computed: {
            /**
             * Show `SAVE` button if the number is entered and the input field is not disabled.
             * @returns {boolean}
             * */
            showButton(){
                return this.localData.number && !this.localData.disabled;
            }
        },
        methods: {
            /**
             * Save changes calling `updateCell` mutation.
             * */
            save(){
                this.$store.commit('updateCell', this.localData);
            },
            /**
             * Copy prop data to local state.
             * */
            initLocalState(){
                this.localData.id = this.cell.id;
                this.localData.number = this.cell.number;
                this.localData.disabled = this.cell.disabled;
            },
        },
        created() {
            this.initLocalState();
        }
    }
</script>

<style scoped>

</style>
