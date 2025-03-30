import './App.css';
import ShowUser from './components/ShowUser';
import { Provider } from 'react-redux';
import store from './redux/store';




function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <ShowUser  />
          </div>
      </Provider>
  );
}


export default App;