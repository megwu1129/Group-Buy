import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './Post.css';
import { useParams } from "react-router-dom";


  const PostComponent = (props) => {
    const {id} = useParams()
    console.log(useParams())
    //Post State
    const [state,setState] = useState({ 

    })
    console.log(state)
    useEffect(()=> {
      if (id)
      Axios.get("http://localhost:3001/post/" + id, {
    }).then((response)=>{
      setState(response.data?.[0])
    }).catch((err)=>{
      console.error(err)
    })    
    },[id])

    //Group State
    const [groupState, setGroupState] = useState([])
    console.log(groupState)
    useEffect(()=> {
      if (id)
      Axios.get("http://localhost:3001/post/group/" + id, {
    }).then((response)=>{
      console.log({response})
      setGroupState(response.data?response.data:[])
    }).catch((err)=>{
      console.error(err)
    })    
    },[id])



    const var_item = groupState.map((item,index)=> {
              
      return (
      <li key={index}> {item.userName} </li>
      )
    })
    console.log(var_item)

    return (
      <div className="card3">
        <h1>{
          `${state.storeName} ${state.productName}`
          }</h1>
        <div>
          <h3>Initiator: {state.userName}</h3>
          <h3>Price: {state.price}</h3>
          <h3>Payment:{state.paymentMethod} </h3>
          <h3>Group Limit: {state.groupLimit} </h3>
          <h3>Link: {state.link} </h3>
        </div>
        <div>
          <h3>Current Group Member</h3>
          <ol>
            {groupState.length ? var_item : null }
            
          </ol>
        </div>
        <div>
          <h3>Average Price: </h3>
          {/* Math.round */}
          <h5> ${(state.price/groupState.length).toFixed(2)}  / person</h5>
        </div>
        <div>
          <button>Join</button>
          {/* <button>Update</button> */}
          <button>Delete</button>
        </div>
      </div>
    )
 
}


export default PostComponent;