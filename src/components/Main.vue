<template>
    <div id="main">
        <div id="cells-wrap">
            <Cell v-for="(cell, index) in cells"
                  :key="index+1"
                  :id="index+1"
                  :cell="cell"
            />
        </div>
        <div class="clearfix"></div>
        <Trigger @triggerIntersected="debouncedLoadMore" />
        <img src="../assets/img/spinner-circle.gif" alt="spinner" class="spinner" v-show="loading">
    </div>
</template>

<script>
    import _ from 'lodash'
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
            return {
                cells: new Array(200),
                cellsInRow: 100,
                maxRows: 100,
                cellHeight: 398,
                loading: false,
            }
        },
        computed: {
            /*loading(){
                return false; // return this.$store.state.loading;
            }*/
        },
        methods: {
            calculateRows(){
                let pageYOffset = window.pageYOffset;
                if(pageYOffset === 0){
                    return 2;
                }
                //console.log('ROWS: '+Math.ceil(pageYOffset / this.cellHeight));
                return Math.ceil(pageYOffset / this.cellHeight + 1);
            },
            loadMore(){
                //this.loading = true;
                let rows = this.calculateRows();
                if(rows > this.maxRows) return;
                let count = this.cellsInRow * rows;
                this.cells = new Array(count); // dispatch action
                //this.loading = false;
            },
        },
        created() {
            this.debouncedLoadMore = _.debounce(this.loadMore, 500);
        },
        updated(){
            //this.loading = false;
        },
        mounted(){
            window.scrollTo(0, 0);
            document.addEventListener('scroll', () => {
                let pageYOffset = window.pageYOffset;
                let rows = this.cells.length / this.cellsInRow;
                /*console.log(rows);
                console.log(pageYOffset);
                console.log(pageYOffset / rows);
                console.log('-------------------');*/
                if(pageYOffset / rows > this.cellHeight){
                    //this.loading = true;
                    this.debouncedLoadMore();
                }
            })
        }
    }
</script>

<style scoped>

</style>
