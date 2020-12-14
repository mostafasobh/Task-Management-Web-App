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
        id: 11,
        headTitle: 'headTitle2',
        cards: [{
            id: 66,
            headline: 'card Title',
            description: 'card coulmn 2'
        },
        ]
    },
    {
        id: 22,
        headTitle: 'headTitle3',
        cards: [{
            id: 22,
            headline: 'card Title',
            description: 'card column 3'
        },
        ]
    }],
    modal: {
        status: false,
        activeCard: null
    }
}
function generateId(obj) {
    obj.id = Math.floor(Math.random() * 10000)
    return obj
}
function searchObjArray(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i
        }
    }
}
const reducer = (state = initialState, action) => {
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
        default:
            return state
    }

}

export default reducer






//modifying modals to recive cards data and modifying them