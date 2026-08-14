import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedConversation:null,
    messages:[] as any[]
}

const conversationSlice = createSlice({
    name:"conversation",
    initialState,
    reducers:{
        setSelectedConversation:(state,action)=>{
            state.selectedConversation=action.payload
        },
        setMessages:(state,action)=>{
            state.messages=action.payload
        },
        addMessage:(state,action)=>{
            state.messages.push(action.payload)
        },
        clearMessages:(state)=>{
            state.messages=[]
        }

    }
})

export const {setSelectedConversation,setMessages,addMessage,clearMessages} = conversationSlice.actions
export default conversationSlice.reducer