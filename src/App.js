import React, { useEffect } from 'react'
import './App.css';
import { connect } from 'react-redux'
import Columns from './components/columns/Columns';
import Modal from './components/Modal/Modal'

function App(props) {
  useEffect(() => {
    window.addEventListener('load', props.enter)
    window.addEventListener('beforeunload', props.leave)
  }, [props.enter, props.leave])
  return (
    <div className="App">
      {props.modal ? <Modal /> : null}
      <div className='task-container'>
        <Columns />
        <div className='add-column' onClick={() => props.addColumn()}>
          add new column
        </div>
      </div>

    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    modal: state.modal.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addColumn: () => dispatch({ type: 'add-column' }),
    leave: () => dispatch({ type: 'leave' }),
    enter: () => dispatch({ type: 'enter' }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
