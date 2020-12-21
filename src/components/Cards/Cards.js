import React from 'react'
import { connect } from 'react-redux'
import './Cards.css'
// import TextareaAutosize from 'react-textarea-autosize';
import { Draggable } from 'react-beautiful-dnd'



//dnd drop

const Cards = ({
    key,
    setCardHeadline,
    id,
    headline,
    description,
    column,
    openModal,
    closeModal,
    setActiveCardData,
    provided,
    cardIndex,
    deleteCard
}) => {
    // const ref = useRef(null)

    // const selectAllText = () => {
    //     ref.current.select()
    // }

    // const onChangeHandler = (e, id, columnIndex) => {
    //     setCardHeadline(e.target.value, id, columnIndex)
    // }

    /* DND NOTES */
    //dragable required props : dragabaleId && index
    //provided.dragableProps: props need to be applied to the component that we want to move around
    //provided.draggableHandleProps: props need to be applied to the part of the component that we want
    //to use to be able to control the entire component

    // resizeTextarea(ref.current)
    let addClass
    return (

        <Draggable
            draggableId={JSON.stringify(id)}
            index={cardIndex}
        >
            {(provid, snapshot) => {
                snapshot.isDragging ? addClass = 'isDragging' : addClass = ''
                return (

                    <div
                        key={key}
                        className={`card ${addClass}`}
                        {...provid.draggableProps}
                        {...provid.dragHandleProps}
                        ref={provid.innerRef}
                    >

                        {/* <TextareaAutosize
                        // disabled={true}
                        spellCheck={false}
                        maxRows={8}
                        rows={4}
                        className='card-text'
                        value={headline}
                        //  onChange={(e) => onChangeHandler(e, id, column)}
                        onClick={(e) => { setActiveCardData({ id, headline, description, column }); openModal() }}
                    /> */}
                        <h4
                            onClick={(e) => { setActiveCardData({ id, headline, description, column }); openModal() }}

                        >

                            {headline}
                        </h4>
                        <span className='card-delete' onClick={() => deleteCard(cardIndex, column)}>X</span>
                    </div>
                )
            }
            }
        </Draggable>
    )

}

const mapStateToProps = state => {
    return {
        // modal: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        openModal: (id, column) => dispatch({ type: 'open-modal', id, column }),
        closeModal: () => dispatch({ type: 'close-modal' }),
        setActiveCardData: (prop) => dispatch({ type: 'set-active-card', prop }),
        setCardHeadline: (value, id, column) => dispatch({ type: 'set-card-title', value, id, column }),
        deleteCard: (cardIndex, columnIndex) => dispatch({ type: 'delete-card', cardIndex, columnIndex })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards)