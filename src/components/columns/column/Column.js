import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import Cards from '../../Cards/Cards'
import './Column.css'
import TextareaAutosize from 'react-textarea-autosize';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Menu from '../../optionsList/optionsList'




const Column = (props) => {
    const [newCard, setNewCard] = useState(0)
    const ref = useRef(null)
    const selectAllText = () => {
        ref.current.select()
    }
    const onChangeHandler = (e, id) => {
        props.setHeadline(e.target.value, id)
        console.log(e.target.value)
    }
    if (ref.current) {
        if (ref.current.style.height <= '350px') {
            ref.current.style.overflowY = 'scroll'
        }
    }
    //dropable required prop is dropableId
    //dropable must be function that returns components
    let classes;
    let col = (
        <Draggable
            draggableId={JSON.stringify(props.randomKey)}
            index={props.columnIndex}
        >
            {(provided) => (

                <div
                    key={props.key}
                    className={`column ${classes}`}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div className='head' {...provided.dragHandleProps} >
                        <div className='title-container'>
                            <TextareaAutosize
                                ref={ref}
                                value={props.headTitle}
                                onClick={() => selectAllText()}
                                className='title'
                                onChange={(e) => onChangeHandler(e, props.id)}
                            />

                        </div>
                        <Menu index={props.columnIndex} />
                    </div>
                    <Droppable
                        droppableId={JSON.stringify(props.id)}
                        type='task'
                    >
                        {(provided, snapshot) => {

                            snapshot.isDraggingOver ? classes = 'isDraggingOver' : classes = ''

                            return (
                                <>
                                    <div
                                        className='cards-container'
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {props.cards.map((card, index) => (
                                            <Cards
                                                key={card.id}
                                                id={card.id}
                                                cardIndex={index}
                                                description={card.description}
                                                headline={card.headline}
                                                column={props.columnIndex}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </>
                            )
                        }}
                    </Droppable>

                    <div className='more-space'></div>
                    <div
                        className='bottom-btn-container'
                        onClick={() => {
                            setNewCard({ ...newCard }); props.addNewCard({
                                headline: 'newCard',
                                description: 'newcard description',
                                id: Math.floor(Math.random() * 10000),
                                column: props.columnIndex
                            },
                                props.columnIndex);
                            console.log()
                        }}
                    >
                        <button><span>+</span>click to add card</button>
                    </div>
                </div>

            )}
        </Draggable>
    )
    return (
        <>
            {col}
        </>
    )
}

const mapStateToProps = state => {
    return {
        columns: state.columns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setHeadline: (value, id) => dispatch({ type: 'set-title', value, id }),
        addNewCard: (data, columnIndex) => dispatch({ type: 'add-card', data, column: columnIndex, })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)

