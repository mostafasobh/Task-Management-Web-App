import React, { } from 'react'
import './Columns.css'
import { connect } from 'react-redux'
import Column from './column/Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const Columns = (props) => {
    //snapshot object contains number of props that is used to style draggable components during a drag

    const onDragEnd = (result) => {
        const { source, destination, draggableId, type } = result
        // console.log({ draggableId: result.draggableId, destination: result.destination.index, source: result.source.index, droppableId: result.destination.droppableId })

        if (!result.destination) {
            console.log('ther is no destination')
            return;
        } else if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log('user placed the card back to it\'s place ')
            return;
        }
        else if (type === 'task') {
            console.log(type)
            props.reorderCards(draggableId,
                source.index,
                destination.index,
                source.droppableId,
                destination.droppableId
            )
            return;
        }
        if (type === 'column') {
            if (!result.destination) {
                console.log('ther is no destination')
                return;
            } else
                if (source.index !== destination.index) {
                    props.reorderColumns(source.index, destination.index, draggableId)
                    return;
                }
        }

    }

    let col = (
        props.columns.map((c, i) => {
            return (
                <Column
                    key={i}
                    headTitle={c.headTitle}
                    id={c.id}
                    columnIndex={i}
                    cards={c.cards}
                    randomKey={Math.floor(Math.random() * 1000)}
                />
            )
        })
    )
    //onDragEnd is required
    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Droppable
                droppableId='all-columns'
                type='column'
                direction='horizontal'
            >
                {(provided, snapshot) => (

                    <div
                        className='columns-container'
                        ref={provided.innerRef}
                        {...provided.droppableProps}

                    >
                        {col}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const mapStateToProps = state => {
    return {
        columns: state.columns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setHeadline: (value, index) => dispatch({ type: 'set-title', value, index }),
        addNewCard: (data, columnIndex) => dispatch({ type: 'add-card', data, column: columnIndex }),
        reorderCards: (draggableId, sourceIndex, destinationIndex, sourceDroppableId, destinationDroppableId) => {
            return dispatch({ type: 'move-card', draggableId, sourceIndex, destinationIndex, sourceDroppableId, destinationDroppableId })
        },
        reorderColumns: (sourceIndex, destinationIndex, draggabaleId) => dispatch({ type: 'move-column', sourceIndex, destinationIndex, draggabaleId }),
        addColumn: () => dispatch({ type: 'add-column' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)