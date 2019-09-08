<template>
    <div id="main">
        <div id="cells-wrap">
            <Cell v-for="cell in cells"
                  :key="cell.id"
                  :cell="cell"
            />
        </div>
        <div class="clearfix"></div>
        <Trigger @triggerIntersected="loadMoreDebounced" />
        <img src="../assets/img/spinner-circle.gif" alt="spinner" class="spinner" v-show="loading">
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapState, mapMutations } from 'vuex'
    import Cell from './Cell'
    import Trigger from './Trigger'

    export default {
        name: 'Main',
        components: {
            Cell,
            Trigger
        },
        props: {},
        data(){
            return {}
        },
        computed: mapState([
            'cells',
            'cellsInRow',
            'maxRows',
            'cellHeight',
            'loading'
        ]),
        methods: {
            calculateRows(){
                let pageYOffset = window.pageYOffset;
                if(pageYOffset < 100){
                    return 2;
                }
                return Math.ceil(pageYOffset / this.cellHeight + 1);
            },
            loadMore(){
                let rows = this.calculateRows();
                if(rows > this.maxRows) return;
                let count = this.cellsInRow * rows;
                this.loadCells({count: count});
            },
            ...mapMutations([
                'loadCells',
                'enableLoading',
                'disableLoading'
            ]),
        },
        created() {
            this.loadCells({count: 200});
            this.loadMoreDebounced = _.debounce(this.loadMore, 500);
            this.disableLoadingDebounced = _.debounce(this.disableLoading, 500);
        },
        updated(){
            this.disableLoadingDebounced();
        },
        mounted(){
            window.scrollTo(0, 0);
            document.addEventListener('scroll', () => {
                let pageYOffset = window.pageYOffset;
                let rows = this.cells.length / this.cellsInRow;
                if(pageYOffset / rows > this.cellHeight){
                    this.enableLoading();
                    this.loadMore();
                }
            })
        }
    }
</script>

<style scoped>

</style>
