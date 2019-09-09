<template>
    <div id="main">

        <!--Cells container-->
        <div id="cells-wrap">
            <!--Loop through existing cells and render them one by one-->
            <Cell v-for="cell in cells"
                  :key="cell.id"
                  :cell="cell"
            />
        </div>

        <!--Clear floats if there are any-->
        <div class="clearfix"></div>

        <!--Trigger component to watch the intersection with visible area and load more cells-->
        <Trigger @triggerIntersected="loadMoreDebounced" />

        <!--Loading spinner-->
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

        data(){
            return {}
        },

        // Map state to computed props
        computed: mapState([
            'cells',
            'cellsInRow',
            'maxRows',
            'cellHeight',
            'loading'
        ]),

        methods: {

            /**
             * Calculates how many rows have to be loaded according to scrolling offset.
             * @returns {number}
             * */
            calculateRows(){
                let pageYOffset = window.pageYOffset;
                if(pageYOffset < 100) return 2;
                return Math.ceil(pageYOffset / this.cellHeight + 1);
            },

            /**
             * Loads more cells.
             * */
            loadMore(){

                // Define how many rows to load
                let rows = this.calculateRows();

                // If the number exceeds the MAX limit - return
                if(rows > this.maxRows) return;

                // Define how many cells to load
                let count = this.cellsInRow * rows;

                // Load more cells
                this.loadCells({count: count});

            },

            // Map mutations to methods
            ...mapMutations([
                'loadCells',
                'enableLoading',
                'disableLoading'
            ]),

        },

        created() {

            // Load initial portion of cells
            this.loadCells({count: 200});

            // Create `debounced` version of `loadMore` function with the delay of 500 ms
            this.loadMoreDebounced = _.debounce(this.loadMore, 500);

            // Create `debounced` version of `disableLoading` function with the delay of 500 ms
            this.disableLoadingDebounced = _.debounce(this.disableLoading, 500);

        },

        updated(){
            // Disable loading after the component is updated
            this.disableLoadingDebounced();
        },

        mounted(){

            // Scroll to top if the page was reloaded
            window.scrollTo(0, 0);

            // Listen for scroll event to define whether to load more cells or not
            document.addEventListener('scroll', () => {

                // Define vertical scrolling offset (page)
                let pageYOffset = window.pageYOffset;

                // Calculate the number of rows on the page
                let rows = this.cells.length / this.cellsInRow;

                // If scrolling offset (window) is bigger than cell height -
                // enable loading and load more cells
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
