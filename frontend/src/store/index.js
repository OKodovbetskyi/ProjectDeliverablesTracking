import { configureStore, createSlice } from '@reduxjs/toolkit'
const assignDeliverableInitial = { 
    additionalInformation : false
}
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
export const store = configureStore({
  reducer: {DevOptions: DeliverableOptionsSlice.reducer},
})