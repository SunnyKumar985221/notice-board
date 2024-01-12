import React, { createContext, useReducer } from "react";
export const CardContext = createContext();

const initialState = {
    data: []
};

const authReducer = (state, action) => {
    if (action.type === 'CREATE') {
        const newData = { id: state.data.length + 1, text: action.payload.notetext };
        return {
            ...state,
            data: [...state.data, newData]
        };
    } else if (action.type === 'DELETE') {
        const updatedData = state.data.filter(item => item.id !== action.payload.id);
        return {
            ...state,
            data: updatedData
        };
    } else if (action.type === 'EDIT') {
        const updatedData = state.data.map(item =>
            item.id === action.payload.id ? { ...item, text: action.payload.text } : item
        );
        return {
            ...state,
            data: updatedData
        };
    } else {
        return state;
    }
};




export const CardDataProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <CardContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CardContext.Provider>
    );
};
