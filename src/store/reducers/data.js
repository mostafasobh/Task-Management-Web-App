import update from 'react-addons-update'

const initialState = {
    columns: [{
        id: 220,
        headTitle: 'headTitle1',
        cards: [{
            id: 33,
            headline: 'card Title1',
            description: 'card column 1'
        },
        {
            id: 55,
            headline: 'card Title2',
            description: 'card column 1'
        }]
    },
    {
        id: 320,
        headTitle: 'headTitle2',
        cards: [{
            id: 66,
            headline: 'card Title',
            description: 'card coulmn 2'
        },
        ]
    },
    {
        id: 50,
        headTitle: 'headTitle3',
        cards: [{
            id: 22,
            headline: 'card Title',
            description: 'card column 3'
        },
        ]

    }
        // , {
        // id: 22,
        // headTitle: 'headTitle3',
        // cards: [{
        // id: 22,
        // headline: 'card Title',
        // description: 'card column 3'
        // },
        // ]
        // }
    ],
    modal: {
        status: false,
        activeCard: null
    },
    list: false
}

function reorderColumns(arr, start, end) {
    let result = arr;
    let removed = result.splice(start, 1)[0]
    result.splice(end, 0, removed)
    return result
}
function parse(str) {
    return parseInt(str)
}
function searchObjArray(arr, id) {
    if (typeof id === 'string') id = parse(id)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i
        }
    }
}
function newColumn() {
    return {
        id: Math.floor(Math.random() * 10000),
        headTitle: 'new Task Column',
        cards: []
    }
}
function cardReorder(sourceIndex, destinationIndex, arr1, arr2, obj, destinationId, sourceId) {
    let result = arr1
    let result2 = arr2
    if (destinationId === sourceId) {
        result.splice(sourceIndex, 1)
        result.splice(destinationIndex, 0, obj)
        return { first: result, second: result }
    } else {
        result.splice(sourceIndex, 1)
        result2.splice(destinationIndex, 0, obj)
    }
    return { first: result, second: result2 }
}
const reducer = (state = initialState, action) => {

    if (action.type === 'leave') {
        localStorage.setItem('all-Data', JSON.stringify(state.columns))

        return state
    } else if (action.type === 'enter') {
        let lastData = JSON.parse(localStorage.getItem('all-Data'))
        return {
            ...state,
            columns: lastData ? lastData : state.columns
        }
    }
    switch (action.type) {
        case 'add-description':
            const newDescription = update(state, { columns: { 0: { cards: { 0: { description: { $set: 'iam changed' } } } } } })
            return newDescription

        case 'open-modal':
            const openModal = update(state, { modal: { status: { $set: true } } })
            return openModal

        case 'close-modal':
            let ind = searchObjArray(state.columns[action.data.column].cards)
            const closeModal = update(state, { columns: { [action.data.column]: { cards: { [ind]: { $set: action.data } } } }, modal: { status: { $set: false } } })
            return closeModal

        case 'set-title':
            let i = searchObjArray(state.columns, action.id)
            const newVal = update(state, { columns: { [i]: { headTitle: { $set: action.value } } } })
            return newVal

        case 'set-active-card':
            const activeCard = update(state, { modal: { activeCard: { $set: action.prop } } })
            return activeCard

        case 'set-active-card-title':
            const activeCardTitle = update(state, { modal: { activeCard: { headline: { $set: action.value } } } })
            return activeCardTitle

        case 'set-active-card-description':
            const activeCarddescription = update(state, { modal: { activeCard: { description: { $set: action.value } } } })
            return activeCarddescription

        case 'add-card':
            const addNewCard = update(state, { columns: { [action.column]: { cards: { $push: [action.data] } } } })
            return addNewCard

        case 'set-card-title':
            let index = searchObjArray(state.columns[action.column].cards, action.id)
            const changeCardTitle = update(state, { columns: { [action.column]: { cards: { [index]: { headline: { $set: action.value } } } } } })
            return changeCardTitle

        case 'set-card-description':
            let inde = searchObjArray(state.columns[action.column].cards, action.id)
            const changeCardDescription = update(state, { columns: { [action.column]: { cards: { [inde]: { description: { $set: action.value } } } } } })
            return changeCardDescription

        //cards movement section
        case 'move-card':
            const fromColumn = searchObjArray(state.columns, action.sourceDroppableId)
            const toColumn = searchObjArray(state.columns, action.destinationDroppableId)
            const movedCard = state.columns[fromColumn].cards[action.sourceIndex]
            const newCards = cardReorder(action.sourceIndex, action.destinationIndex, [...state.columns[fromColumn].cards], [...state.columns[toColumn].cards], movedCard, action.destinationDroppableId, action.sourceDroppableId)
            let removeSource = update(state, { columns: { [fromColumn]: { cards: { $set: newCards.first } }, [toColumn]: { cards: { $set: newCards.second } } } })
            return removeSource
        case 'move-column':
            if (action.sourceIndex === action.destinationIndex) return state
            let newColumnsOrder = reorderColumns([...state.columns], action.sourceIndex, action.destinationIndex)
            let newOrder = update(state, { columns: { $set: newColumnsOrder } })
            return newOrder
        case 'add-column':
            let addColumn = update(state, { columns: { $push: [newColumn()] } })
            return addColumn
        case 'toggle-list':
            return update(state, { list: { $set: state.list ? false : true } })
        case 'delete-column':
            // return update(state, { columns: { $splice: [action.index, 1] } })
            return update(state, { columns: { $splice: [[[action.index], 1]] } })
        case 'delete-card':
            return update(state, { columns: { [action.columnIndex]: { cards: { $splice: [[[action.cardIndex], 1]] } } } })

        default:
            return state
    }

}



export default reducer






//modifying modals to recive cards data and modifying them