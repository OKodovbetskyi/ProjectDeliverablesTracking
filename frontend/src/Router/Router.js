import { Route, Routes } from "react-router-dom"
import LoginForm from "../components/LoginForm/LoginForm"
import DeliverableManager from "../UI/DeliverableManager"
import HomePage from "../UI/HomePage"
import ManagerPage from "../UI/AdminPanel"

const Router = () =>{
    return(
        <Routes>
<Route exact path='/' element={<LoginForm />}> 
</Route>
<Route exact path='/home' element={<HomePage />}> 
</Route>
<Route exact path='/admin' element={<ManagerPage />}> 
</Route>
<Route exact path='/admin/managedeliverables' element={<DeliverableManager />}> 
</Route>

</Routes>
    )
}
export default Router;
