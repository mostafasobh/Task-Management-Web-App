import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import Cards from '../../Cards/Cards'
import './Column.css'
import TextareaAutosize from 'react-textarea-autosize';

// import { v4 as uuid } from "uuid";

const Column = (props) => {
    const [newCard, setNewCard] = useState(0)
    const ref = useRef(null)
    const selectAllText = () => {
        ref.current.select()
    }
    const onChangeHandler = (e, id) => {
        props.setHeadline(e.target.value, id)
    }
    let col = (
        <div key={props.id} className='column'>
            <div className='head'>
                <div className='title-container'>
                    <TextareaAutosize
                        ref={ref}
                        value={props.headTitle}
                        onClick={() => selectAllText()}
                        className='title'
                        onChange={(e) => onChangeHandler(e, props.id)}
                    />

                </div>
                <div className='list-control'>
                    <span>...</span>
                </div>
            </div>
            <div className='cards-container'>
                {props.cards.map((card, index) => (
                    <Cards
                        key={card.id}
                        id={card.id}
                        description={card.description}
                        headline={card.headline}
                        column={props.columnIndex}
                    />
                ))}
            </div>
            <div
                className='bottom-btn-container'
                onClick={() => { setNewCard({ ...newCard }); props.addNewCard({ headline: 'newCard', description: 'newcard description' }, props.columnIndex) }}>
                <button>click to add card</button>
                <span>+</span>
            </div>
        </div>
    )
    return (
        <>
            {col}
        </>
    )
}

const mapStateToProps = state => {
    return {
        // columns: state.columns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setHeadline: (value, id) => dispatch({ type: 'set-title', value, id }),
        addNewCard: (data, columnIndex) => dispatch({ type: 'add-card', data, column: columnIndex })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)

