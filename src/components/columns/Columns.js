import React, { useRef, useState } from 'react'
import './Columns.css'
import { connect } from 'react-redux'
import Column from './column/Column'

const Columns = (props) => {


    let col = (
        props.columns.map((c, i) => {
            return (
                <Column
                    key={i}
                    headTitle={c.headTitle}
                    id={c.id}
                    columnIndex={i}
                    cards={c.cards}
                />
            )
        })
    )
    return (
        <div className='columns-container'>
            {col}
        </div>
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
        addNewCard: (data, columnIndex) => dispatch({ type: 'add-card', data, column: columnIndex })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)