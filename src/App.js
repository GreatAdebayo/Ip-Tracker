import './App.css';
import {Fragment} from 'react'
import Homepage from './components/Homepage'
import AppState from './context/AppState'

function App() {
  return (
    <Fragment>
     <AppState>
     <Homepage/>
     </AppState>
    </Fragment>
  );
}

export default App;
