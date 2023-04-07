import { Route, Routes } from "react-router-dom"
import LoginForm from "../components/LoginForm/LoginForm"
import DeliverableManager from "../UI/DeliverableManager"
import HomePage from "../UI/HomePage"
import ManagerPage from "../UI/AdminPanel"
import Profiles from "../UI/Profiles/Profiles"
import ProfilesBuilder from "../UI/ProfilesBuilder"
import DeliverableAssociation from "../UI/DeliverableAssociation"
import DeliverableAssign from "../UI/DeliverableAssign"

const Router = () =>{
    
    return(
<Routes>
<Route index element={<LoginForm />}/> 
<Route exact path='home' element={<HomePage />}/> 
<Route path='/admin' element={<ManagerPage />}/> 
<Route path="/admin/profiles" element={<Profiles />} />
<Route path="/admin/profilesbuilder" element={<ProfilesBuilder />} />
<Route path='/admin/managedevs' element={<DeliverableManager />} /> 
<Route path='/admin/associatedeliverable' element={<DeliverableAssociation />} /> 
<Route path='/admin/assigndeliverablestouser/userID' element={<DeliverableAssign />} /> 
</Routes>
    )
}
export default Router;
