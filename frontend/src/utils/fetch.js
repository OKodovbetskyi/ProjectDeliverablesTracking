function fetch (api,state){

fetch(`${api}`)
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

  export default fetch;