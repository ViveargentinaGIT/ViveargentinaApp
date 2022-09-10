import React from 'react'
import { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import {verifyUser} from '../../redux/action'
import { useDispatch } from "react-redux";

function Verify() {
    const history = useHistory();
    let pathName = history.location.pathname.split('/');
    let id = pathName[pathName.length-2]
    let token = pathName[pathName.length-1]
    const dispatch = useDispatch()
    useEffect(async()=>{
        await dispatch(verifyUser(id,token))
        history.push("/home")
    },[])
    return (
        <div>
            <h1>Email verification</h1>
        </div>
    )
}

export default Verify