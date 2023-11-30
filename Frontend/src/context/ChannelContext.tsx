/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {ReactNode, createContext, useReducer} from "react";


interface ChannelContextType {
    channels: any;
    dispatch: React.Dispatch<Action>;
  }

  interface Action {
    type: string;
    payload?: any;
  }

  export const ChannelsContext = createContext<ChannelContextType> (
        {
            channels: [],
            dispatch: () => {}
        }
    );

export const channelReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_CHANNELS":
            return { channels: action.payload };
        case "CREATE_CHANNEL":
            return { channels: [...state.channels, action.payload] };
        case "DELETE_CHANNEL":
            return {
                channels: state.channels.filter(
                    (channel: any) => channel.id !== action.payload
                ),
            };
        default:
            return state;
    }
}

interface ChannelContextProviderProps {
    children: ReactNode;
  }

export const ChannelContextProvider = ({children}: ChannelContextProviderProps) => {
    const [state, dispatch] = useReducer(channelReducer, { channels: null });


    console.log("ChannelContext state: ", state);
    return (
        <ChannelsContext.Provider value={{...state, dispatch}}>
        {children}
        </ChannelsContext.Provider>
    )
    }