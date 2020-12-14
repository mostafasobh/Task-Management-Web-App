const initialState = {
    count: 1,
    items: ['Item 1', 'Item 2', 'item3']
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'sort-end':
            return {
                ...state,
                items: state.items
            }
        default:
            return state
    }

}

export default reducer