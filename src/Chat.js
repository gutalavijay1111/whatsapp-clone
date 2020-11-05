import React, {useEffect, useState} from 'react'
import "./Chat.css"
import Avatar from "@material-ui/core/Avatar";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams } from "react-router-dom";
import db from "./firebase"
import { useStateValue } from './StateProvider';
import firebase from "firebase";
function Chat() {
    const [input, setInput] = useState('');   
    const [seed, setSeed] = useState('');
    // useParams hook to fetch the pattern passed in the Url..
    const { roomId } = useParams();
    const [allowedUsers, setAllowedUsers] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();



    useEffect(() => {
        if (roomId) {
            setAllowedUsers([])
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setAllowedUsers(snapshot.data().allowed_users)
            ))
            console.log(allowedUsers)    
        }
    },[roomId])


    // we can have multiple useEffect hooks
    // And this hook is dependent on variable called roomId.
    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).
            onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));
            db.collection('rooms').doc(roomId).collection('messages').
            orderBy('timestamp','asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    },[roomId])

    // we just are setting seed to roomID, 😅
    useEffect(() => {
        // setSeed(Math.floor(Math.random()*5000));
        setSeed(roomId);        
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input)

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    return allowedUsers.includes(user.email) ? (
        <div className="chat">
            {/* Chat Header */}
            <div className="chat__header">
                {/* avatars */}
                <Avatar  src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
                {/* Header Info */}
                    <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                        <p>
                            {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString().slice(5,12).concat(new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString().slice(17,25))}
                            </p>
                    </div>
                    {/* Header Icons */}
                    <div className="chat__headerRight">
                        <IconButton>
                            <SearchOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <AttachFileOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
            </div>
            {/* Chat Body */}
            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user.displayName &&'chat__reciever'}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString().slice(5,12).concat(new Date(message.timestamp?.toDate()).toUTCString().slice(17,25))}
                    </span>
                </p>

                ) )}
            <div className="chat__bodyAnchor"></div>
            </div>
            {/* Chat Footer */}
            <div className="chat__footer" >
                <InsertEmoticonIcon />
                <form >
                    <input value={input} type="text"
                        onChange = {(e) => setInput(e.target.value)}
                        placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    ) : (
        <div className="chat__bodyBored">
        <img className="panda" src="https://static.boredpanda.com/blog/wp-content/uploads/2016/02/experience-nyc-in-30-outstanding-animated-gifs-12__605.gif"></img>
        </div>
    )
}

export default Chat;
