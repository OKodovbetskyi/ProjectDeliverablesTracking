import API_URL from "./API_URL";
export const API = {};

API.get= (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const callFetch = async (endpoint, method, dataObj) =>{
    console.log(dataObj);
//Build request object
let requestObj = {method: method};
if (dataObj) requestObj = {
    ...requestObj,
    headers: {'Content-type' : 'application/json'},
    body:JSON.stringify(dataObj)
}

try {
    const endpointAddress = API_URL + endpoint;
    
    const response = await (fetch(endpointAddress, requestObj));
    const result = await response.json();
    console.log(result);
    return (response.status >=200) && (response.status <300)
        ? {isSuccess : true, result: result}
        : {isSuccess : false, message: `${result.message}`}
}catch (error){
    return {isSuccess: false, message:error.message }
}
}

export default API;