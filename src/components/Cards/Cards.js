import React, { useRef } from 'react'
import { connect } from 'react-redux'
import './Cards.css'
import TextareaAutosize from 'react-textarea-autosize';


const Cards = ({ key, setCardHeadline, id, headline, description, column, openModal, closeModal, setActiveCardData }) => {

    const ref = useRef(null)

    // const selectAllText = () => {
    //     ref.current.select()
    // }

    // const onChangeHandler = (e, id, columnIndex) => {
    //     setCardHeadline(e.target.value, id, columnIndex)
    // }
    let Card = (
        <div
            key={key}
            className='card'
        >
            <TextareaAutosize
                // disabled={true}
                spellCheck={false}
                maxRows={8}
                rows={4}
                ref={ref}
                className='card-text'
                value={headline}
                //  onChange={(e) => onChangeHandler(e, id, column)}
                onClick={(e) => { setActiveCardData({ id, headline, description, column }); openModal(); console.log(this) }}
            />
        </div>
    )



    // resizeTextarea(ref.current)

    return (
        <>
            {Card}
        </>
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
        setCardHeadline: (value, id, column) => dispatch({ type: 'set-card-title', value, id, column })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards)