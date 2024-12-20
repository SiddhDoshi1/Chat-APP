import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
    const INITIAL_STATE = {
        chatId:"null",
        user:{}
    }

    const {currentUser} = useContext(AuthContext);

    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
                };
            case "LOGOUT":
                return INITIAL_STATE;
        }
    }

    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);
    if(!currentUser){
        return (
            <ChatContext.Provider value={{data: null, dispatch}}>
                {children}
            </ChatContext.Provider>
        )
    }

    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
}