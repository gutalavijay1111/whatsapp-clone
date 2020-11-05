import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import "./SidebarChat.css"
import db from "./firebase"
import { Link } from "react-router-dom";
import AddNewChat from "./AddNewChat"
import {useStateValue} from "./StateProvider"

function SidebarChat({ addNewChat, id, name }) {
    const [messages, setMessages] = useState("");
    const [{ user }, dispatch] = useStateValue();
    const [allowedUsers, setAllowedUsers] = useState([]);

    
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

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).onSnapshot(snapshot => (
                setAllowedUsers(snapshot.data().allowed_users)
            ))
            console.log(allowedUsers)    
        }
    },[id])

    return allowedUsers.includes(user.email) ? (
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
        <p></p>  // we must return somthing for rendering
                // or else.  It'll throw error.
    )
}

export default SidebarChat
