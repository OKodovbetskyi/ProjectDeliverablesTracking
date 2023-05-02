import { Button } from '@mui/material'
import React , {useState} from 'react'
import Header from '../../components/Header/Header'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProfileForm from '../../components/Profiles/ProfileForm';
import "./Profiles.css"
import ExistingProfiles from '../../components/Profiles/ExistingProfiles';
import useLoad from '../../API/useLoad';
import API from '../../API/API';
import CustomAlert from '../../components/CustomAlert';
import Footer from '../../components/Footer';

const Profiles = () => {
  const endpoint = "/profiles";
const [feedback, setFeedBack] = useState(true);
const [message, showMessage] = useState(false);
  const [PROFILES_DATA, ,loadingMessageProf, loadProfiles] = useLoad(endpoint);
  const [DELIVERABLES_DATA, ,loadingMessageDev, loadDeliverables] = useLoad(endpoint);
  const [profile, setProfile] = useState(false);
  const toggleForm = ()=>{
        setProfile(!profile)
    }
    const handleSubmit = async (profile)=>{
      const response = await API.post("/profiles" , profile);
      if (response.isSuccess){ 
        setFeedBack(true)
       };
      return response.isSuccess
      ? loadProfiles(endpoint) && showMessage(true)
      : setFeedBack(false) ,showMessage(true) ;
    }

  return (
    <div className='container'>
        <Header userType="admin"/>
        <div className="MessageHolder">
        {message && <CustomAlert  feedback={feedback}/> }
        </div>
        <div className='profile-body'>
        <h3>Profiles</h3>
        <Button 
        onClick={toggleForm}
        variant="outlined" 
        color='#1B4571'
        endIcon={<AddCircleOutlineIcon /> }>
        Add new Profile
        </Button>
        {
            profile && <ProfileForm onSubmit={handleSubmit} />
        }
        <ExistingProfiles PROFILES_DATA={PROFILES_DATA}/>
        </div>
        <Footer />
    </div>
  )
}

export default Profiles