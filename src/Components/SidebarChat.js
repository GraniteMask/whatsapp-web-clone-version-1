import { Avatar } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import ReactEmoji from 'react-emoji'
import db from '../firebase'
import './SidebarChat.css'

function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState('')

    useEffect(()=>{
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot=>
                setMessages(snapshot.docs.map((docs)=>
                    docs.data()))
                )
            
        }
    }, [id])

    useEffect(() =>{
        setSeed(Math.floor(Math.random()*5000))
    }, [])

    const createChat =()=>{
        const roomName = prompt("Please enter the name of the Chat Room")

        if (roomName){
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <p>{ReactEmoji.emojify(messages[0]?.message)}</p>
            </div>
        </div>
        </Link>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
