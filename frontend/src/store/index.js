import { configureStore, createSlice } from '@reduxjs/toolkit'
const assignDeliverableInitial = { 
    additionalInformation : false
}
//Option slice with reducers
const DeliverableOptionsSlice = createSlice({
    name : "DeliverableOptionsSlice",
    initialState: assignDeliverableInitial,
    reducers:{
        toggleAdditionalInformation: (state)=>{
            state.additionalInformation = !state.additionalInformation
        }
    }
})



export const DeliverableOptionsActions = DeliverableOptionsSlice.actions;
//Store Config
export const store = configureStore({
  reducer: {DevOptions: DeliverableOptionsSlice.reducer},
})