import React, { useReducer } from 'react'
import AppContext from './app-context'
import appReducer from './app-reducers'
import { GET_MY_IP, SEARCH_IP, CLEAR_IP, IP_ERROR} from './app-actions'
import axios from 'axios'


const AppState = (props) => {
    const initialState = {
     myIP : null,
     isFecthing : true,
     IPError:null,
     position:[]
    }
    const [state, dispatch] = useReducer(appReducer, initialState)


    //get Default IP address
    const  getMyIP  = async () =>{
      try {
      const res = await axios.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_GY49b99mbzklG2IdqBThhPpMhRbke')
      dispatch(
        {
            type:GET_MY_IP,
            payload: res.data
        }
      )
      } catch (error) {
        dispatch({
          type: IP_ERROR,
          payload: error.response.data.messages
        }) 
      }

    }

      //search IP address

      const  searchIP  = async (ipAddress) =>{
        try {
        const res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_GY49b99mbzklG2IdqBThhPpMhRbke&ipAddress=${ipAddress}`)
        dispatch(
          {
              type:SEARCH_IP,
              payload: res.data
          }
        )
        } catch (error) {
            dispatch({
              type: IP_ERROR,
              payload: error.response.data.messages
            })
        }
  
      }

      
      //Clear IP
      const clearIp = () =>{
        dispatch({
          type: CLEAR_IP
        })
      }
    
    return (
        <AppContext.Provider value={{
         myIP:state.myIP,
         getMyIP,
         isFecthing:state.isFecthing,
         searchIP,
         clearIp,
         IPError:state.IPError,
         position:state.position
        }}>
        {props.children}  
        </AppContext.Provider>
    )
}

export default AppState
