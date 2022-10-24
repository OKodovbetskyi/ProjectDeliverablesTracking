function request (state, id){

fetch(`http://localhost:3000/api/deliverables/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    return response.json()
  }).then(data =>{
    state(data);
    return data;
  }) 
}

  export default request;