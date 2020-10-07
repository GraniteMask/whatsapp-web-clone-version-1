import React from 'react'
import {Button} from '@material-ui/core'
import {auth, provider} from '../firebase'
import './Login.css'
import { actionTypes } from './reducer'
import {useStateValue} from './Stateprovider'

function Login() {
    const [{}, dispatch] = useStateValue()

    const signIn = () =>{
        auth
        .signInWithPopup(provider)
        .then(result=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch((error)=>alert(error.message))
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
                <div className="login_text">
                    <h1>Sign in to Whatsapp Web clone</h1>
                    <h4>Version-1</h4>
                </div>

                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
                <h5 style={{paddingTop: "15px"}}>Made with <span role="img" aria-label="emoji">❤️</span> By Ratnadeep DC</h5>
                <h6 style={{paddingTop: "15px", color: "red"}}>Use web browsers in desktops or PC for best experience</h6>
            </div>
        </div>
    )
}

export default Login
