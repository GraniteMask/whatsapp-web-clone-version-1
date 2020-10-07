import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert } from '@material-ui/icons'
import React, {useState, useEffect} from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {useParams} from 'react-router-dom'
import db from '../firebase'
import firebase from 'firebase'
import {useStateValue} from '../Components/Stateprovider'
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import ReactEmoji from 'react-emoji'
import "./Chat.css"

function Chat() {
    const [input, setInput] = useState('')
    // const [seed, setSeed] = useState('')
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    useEffect(()=>{
        if(roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot)=>(
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    },[roomId])

    // useEffect(() =>{
    //     setSeed(Math.floor(Math.random()*5000))
    // }, [])

    const sendMessage = (e) =>{
        e.preventDefault()
        console.log(input)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,    //displayName is from google auth
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('')
    }

    const comingSoon=()=>{
        alert("This Feature is Coming Soon!!!")
    }
    
    return (
        <div className="Chat">
             <div className="chat_header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {" "}
                        {new Date(
                            messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                        }
                    
                    </p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon  onClick={comingSoon} />
                    </IconButton>
                    <IconButton>
                        <AttachFile onClick={comingSoon} />
                    </IconButton>
                    <IconButton>
                        <MoreVert onClick={comingSoon}/>
                    </IconButton>
                </div>
             </div>

             <div className="chat_body">
                 {messages.map((message)=>(
                     <p className={`chat_messages ${message.name===user.displayName && 'chat_receiver'}`}>
                     <span className="chat_name">{message.name}</span> 
                         {ReactEmoji.emojify(message.message)}     
                     <span className="chat_timestamp">
                         {new Date(message.timestamp?.toDate()).toUTCString()}
                     </span>
                     </p>
                 ))}
                
             </div>

             <div className="chat_footer">
             <IconButton> 
             <Button variant="success" onClick={handleShow}><InsertEmoticon /></Button>
            </IconButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Emoji list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p >Happy face= :) | Big Grin= :D | Tongue=:P | Cool=B-)</p> 
                    <p >Sad face= :( | Confused= :-/ | Kiss=:-* | Angel= O:-)</p> 
                    <p >Winking= ;) | Astonished= :X | Surprise=:-O | Cry= :'(</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Button variant="success" style={{paddingLeft:"10px"}}><Mic onClick={comingSoon}/></Button>
             </div>

             
             
            
        </div>
    )
}

export default Chat

