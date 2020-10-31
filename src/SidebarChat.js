import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import "./SidebarChat.css"
import db from "./firebase"
import { Link } from "react-router-dom";
function SidebarChat({ addNewChat, key, id, name }) {
    const [messages, setMessages] = useState("");
    // // seed value is required to generate the random avataaar images.
    // // setting the seed value in state.
    // const [seed, setSeed] = useState('');

    // // using this useEffect hook, we will generate seed randomly.
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random()*5000));
    // }, []);

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    },[id])

    const createChat = () => {
        const roomName = prompt("Please enter a name for Room");

        if(roomName) {
            //do database stuff, if room name entered.
            db.collection("rooms").add({
                name: roomName,
            })
        };
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} >
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/bottts/${id}.svg`} alt="" />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (

        <div className="sidebarChat" onClick={createChat} >
            <h2>Add Chat Room</h2>
        </div> 

    )
}

export default SidebarChat
