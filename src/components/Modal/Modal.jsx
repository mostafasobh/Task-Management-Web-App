import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux'
import './Modal.css'
import Button from '../Button/Button'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {

        borderRadius: '4px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3, 3),
        marginTop: '50px',
        outline: 'none',
        width: '55%',
        backgroundColor: '#e0dcff',
        overflow: 'auto',
    },
}));


function TransitionsModal(props) {
    const classes = useStyles();
    const onChangeHandler = (e, str) => {
        switch (str) {
            case 'title':
                props.setActiveCardTitle(e.target.value)
                props.setCardHeadline(e.target.value, props.activeCard.id, props.activeCard.column)
                break;
            case 'description':
                props.setActiveCarddecription(e.target.value)
                break;
            default:
                return null
        }
    }
    const applySave = () => {
        props.setCardDescription(props.activeCard.description ? props.activeCard.description : '', props.activeCard.id, props.activeCard.column)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.modal}
                onClose={() => { props.closeModal(props.activeCard); }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}
            >
                <Fade in={props.modal}>
                    <div className={classes.paper}>
                        <div className='modal-title-container'>
                            <TextareaAutosize
                                spellCheck={false}
                                className="title modal-card-title"
                                rows={4}
                                value={props.activeCard ? props.activeCard.headline : null}
                                onChange={(e) => onChangeHandler(e, 'title')}
                            />
                        </div>
                        <div className='modal-description-container'>
                            <h3>Description</h3>
                            <TextareaAutosize
                                spellCheck={false}
                                rows={4}
                                onChange={(e) => onChangeHandler(e, 'description')}
                                className="title modal-card-description"
                                value={props.activeCard ? props.activeCard.description : null}
                            />
                            <div className='save-exite-container'>
                                <Button click={() => { applySave() }} type='normal'>save</Button>
                                <Button type='close'></Button>
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