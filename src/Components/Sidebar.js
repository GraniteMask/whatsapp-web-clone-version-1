import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SidebarChat from './SidebarChat'
import db from '../firebase'
import './Sidebar.css'
import { useStateValue } from './Stateprovider';

function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue()
   
    useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot =>(
            setRooms(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data(),
            })))
        ))
        return () =>{
            unsubscribe();
        }
    },[])  //load when the sidebar components loads

    const createChat =()=>{
        const roomName = prompt("Please enter the name of the Chat Room")

        if (roomName){
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    const comingSoon=()=>{
        alert("This Feature is Coming Soon!!!")
    }


    function logout() {
        window.location.reload(false);
      }

    return (
        <div className="sidebar">

            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon  onClick={comingSoon} />
                    </IconButton>
                    <IconButton>
                        <ChatIcon onClick={createChat}/>
                    </IconButton>
                    <IconButton>
                        <PowerSettingsNewIcon onClick={logout}/>
                    </IconButton>
                   
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <IconButton>
                        <SearchOutlinedIcon onClick={comingSoon}/>
                    </IconButton>
                    <input placeholder="Search or start new chat" type="text" />
                    </div>
                </div>


            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map((room)=>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
