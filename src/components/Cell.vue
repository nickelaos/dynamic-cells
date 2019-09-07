<template>
    <div class="cell">
        <h3 class="cell-title">Cell #{{id}}</h3>
        <form @submit.prevent="save">
            <input type="number" class="input-field" v-model="cell.number" :disabled="cell.disabled">
            <label>
                <input type="checkbox" class="input-checkbox" v-model="cell.disabled">Disable input field
            </label>
            <button type="submit" class="submit-button" v-show="showButton">SAVE</button>
        </form>
    </div>
</template>

<script>

    export default {
        name: 'Cell',
        props: {
            id: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                cell: {
                    number: null,
                    disabled: false
                }
            }
        },
        computed: {
            showButton(){
                return this.cell.number && !this.cell.disabled;
            }
        },
        methods: {
            save(){
                console.log(this.cell);
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
