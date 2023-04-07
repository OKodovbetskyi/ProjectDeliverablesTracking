import React, { useEffect,useState } from 'react'
import API from './API';
const useLoad = (endpoint) => {
    //State
    const [loadingMessage, setLoadingMessage] = useState("Loading ...");
    const [records, setRecords] = useState([]);
    const loadRecords = async (endpoint) =>{
    const response = await API.get(endpoint);
      response.isSuccess
        ? setRecords(response.result)
        : setLoadingMessage(response.message)
    }
   
    useEffect(()=>{loadRecords(endpoint)},[endpoint])
    return [records,setRecords, loadingMessage, loadRecords];
}

export default useLoad;