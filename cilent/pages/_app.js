import '../styles/globals.css'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer  from '../redux/reducer/index';
import DataProvider from "../redux/store"

const Store= createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
    <Component {...pageProps} />
    </DataProvider>
  )
}

export default MyApp
