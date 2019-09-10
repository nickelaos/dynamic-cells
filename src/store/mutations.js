export default {

    /**
     * Generates a portion of cells and loads it into the Vuex store
     * @param {Object} payload - must contain `count` property
     * */
    loadCells (state, payload) {

        // Define the index to start with
        let nextIndex = state.cells.length + 1;

        // Generate new cells depending on the passed `payload.count` value
        let arr = [];
        for (let i = nextIndex; i <= payload.count; i++) {
            arr.push({
                id: i,
                number: null,
                disabled: false
            });
        }

        // Merge existing cells with generated cells and save them in Vuex store
        state.cells = [...state.cells, ...arr];

    },

    /**
     * Updates specific cell.
     * */
    updateCell (state, payload) {

        // Find the cell in Vuex state by ID
        let index = 0;
        state.cells.forEach((cell, i = 0) => {
            if (cell.id === payload.id) {
                index = i
            } else {
                i++
            }
        });

        // Update the state of specific cell
        state.cells[index] = payload;

        // Log the output
        console.log(state.cells[index]);

    },

    /**
     * Enables loading animation.
     * */
    enableLoading(state){
        state.loading = true;
    },

    /**
     * Disables loading animation.
     * */
    disableLoading(state){
        state.loading = false;
    },

}
