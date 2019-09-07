<template>
    <div id="main">
        <div v-for="index in iterator">
            <Cell :key="index" :id="index" />
        </div>
    </div>
</template>

<script>
    import Cell from './Cell'

    export default {
        name: 'Main',
        components: {
            Cell
        },
        props: {},
        data(){
            return {
                iterator: Array.from(Array(100).keys()),
            }
        },
        computed: {

        },
        methods: {

        },
        created() {

        }
    }
</script>

<style scoped>

</style>
