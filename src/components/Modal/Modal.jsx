import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux'
import './Modal.css'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
    },
    paper: {

        borderRadius: '4px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3, 3),
        marginTop: '50px',
        outline: 'none',
        width: '55%',
        backgroundColor: '#c3bcff'
    },
}));

function TransitionsModal(props) {
    const classes = useStyles();
    const ref = useRef([])
    const onChangeHandler = (e, str) => {
        switch (str) {
            case 'title':
                props.setActiveCardTitle(e.target.value)
                props.setCardHeadline(e.target.value, props.activeCard.id, props.activeCard.column)
                break;
            case 'description':
                props.setActiveCarddecription(e.target.value)
                props.setCardDescription(e.target.value, props.activeCard.id, props.activeCard.column)
                break;
            default:
                return null
        }
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.modal}
                onClose={(e) => props.closeModal(props.activeCard)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}
            >
                <Fade in={props.modal}>
                    <div className={classes.paper}>
                        <div className='modal-title-container'>
                            {/* <textarea
                                onChange={(e) => onChangeHandler(e, 'title')}
                                ref={el => ref.current[0] = el}
                                className="title modal-card-title"
                                value={props.activeCard ? props.activeCard.headline : null}
                                >
                            </textarea> */}
                            <TextareaAutosize
                                spellCheck={false}
                                className="title modal-card-title"
                                rows={4}
                                value={props.activeCard ? props.activeCard.headline : null}
                                onChange={(e) => onChangeHandler(e, 'title')}
                                ref={el => ref.current[0] = el}
                            />
                        </div>
                        <div className='modal-description-container'>
                            <h3>Description</h3>
                            <TextareaAutosize
                                spellCheck={false}
                                rows={4}
                                onChange={(e) => onChangeHandler(e, 'description')}
                                ref={el => ref.current[1] = el}
                                className="title modal-card-description"
                                value={props.activeCard ? props.activeCard.description : null}
                            />

                            <div className='save-exite-container'>
                                <button>save</button>
                                <button>X</button>
                                <h1 style={{ color: 'red' }}>remember to move autosize library</h1>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        modal: state.modal.status,
        activeCard: state.modal.activeCard,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch({ type: 'open-modal' }),
        closeModal: (data) => dispatch({ type: 'close-modal', data }),
        setActiveCardTitle: (value) => dispatch({ type: 'set-active-card-title', value }),
        setActiveCarddecription: (value) => dispatch({ type: 'set-active-card-description', value }),
        setCardDescription: (value, id, column) => dispatch({ type: 'set-card-description', value, id, column }),
        setCardHeadline: (value, id, column) => dispatch({ type: 'set-card-title', value, id, column })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransitionsModal)