import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './Pages/HomePage';
function App() {
  return (
    <BrowserRouter>

    <Routes>
    <Route exact path='/' element={<LoginForm />}> 
    </Route>
    <Route exact path='/home' element={<HomePage />}> 
    </Route>
    </Routes>
</BrowserRouter>
  );
}

export default App;
