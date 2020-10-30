import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import "./SidebarChat.css"
import db from "./firebase"
function SidebarChat({ addNewChat, key, id, name }) {

    // // seed value is required to generate the random avataaar images.
    // // setting the seed value in state.
    // const [seed, setSeed] = useState('');

    // // using this useEffect hook, we will generate seed randomly.
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random()*5000));
    // }, []);

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
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/${id}.svg`} alt="" />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>Last message...</p>
            </div>
        </div>
    ) : (

        <div className="sidebarChat" onClick={createChat} >
            <h2>Add new chat</h2>
        </div> 

    )
}

export default SidebarChat
