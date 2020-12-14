import './App.css';
import { connect } from 'react-redux'
import Columns from './components/columns/Columns';
import Modal from './components/Modal/Modal'
import Example from './components/dnd/example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
function App(props) {
  return (
    <div className="App">
      <Modal />
      <Columns />
      {/* <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider> */}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    // ctr:state.count
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // increment:()=>dispatch({type:'add'}),
    // decrement:()=>dispatch({type:'subtract'}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
