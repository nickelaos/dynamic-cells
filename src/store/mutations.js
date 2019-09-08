export default {

    loadCells (state, payload) {
        let nextIndex = state.cells.length + 1;

        let arr = [];
        for (let i = nextIndex; i <= payload.count; i++) {
            arr.push({
                id: i,
                number: null,
                disabled: false
            });
        }

        state.cells = [...state.cells, ...arr];
    },

    updateCell (state, payload) {
        let index = 0;
        state.cells.forEach((cell, i = 0) => {
            if (cell.id === payload.id) {
                index = i
            } else {
                i++
            }
        });
        state.cells[index] = payload;
        console.log(state.cells[index]);
    },

    enableLoading(state){
        state.loading = true;
    },

    disableLoading(state){
        state.loading = false;
    },

}
