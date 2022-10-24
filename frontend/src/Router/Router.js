import { Route, Routes } from "react-router-dom"
import LoginForm from "../components/LoginForm/LoginForm"
import HomePage from "../UI/HomePage"

const Router = () =>{
    return(
        <Routes>
<Route exact path='/' element={<LoginForm />}> 
</Route>
<Route exact path='/home' element={<HomePage />}> 
</Route>
</Routes>
    )
}
export default Router;
