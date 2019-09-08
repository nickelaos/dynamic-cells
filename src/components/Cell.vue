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
                localData: {
                    id: null,
                    number: null,
                    disabled: false
                }
            }
        },
        computed: {
            showButton(){
                return this.localData.number && !this.localData.disabled;
            }
        },
        methods: {
            save(){
                this.$store.commit('updateCell', this.localData);
            },
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
