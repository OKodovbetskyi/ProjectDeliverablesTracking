import './App.css';
import { BrowserRouter} from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Router from './Router/Router';
import { Provider } from 'react-redux';
import { store } from './store/index';
function App() {
  return (
    <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
    <Router />
    </BrowserRouter>
    </LocalizationProvider>
    </Provider>
  );
}

export default App;
