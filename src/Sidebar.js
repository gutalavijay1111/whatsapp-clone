import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from "./SidebarChat"
import db from "./firebase"
import { useStateValue } from './StateProvider';
import AddNewChat from "./AddNewChat"
import Search from "./Search"
import Rooms from "./Rooms"

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{ user, searchText }, dispatch] = useStateValue('');
    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => 
            ( setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ))
        );
    }, []);

    return (
        <div className="sidebar">
            {/* Header */}
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} alt="" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />                        
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />                        
                    </IconButton>
                </div>
            </div>

            {/* Search */}
            <div className="sidebar__search">
                <Search />
            </div>
            
            {/* Rooms / Friends */}
            <div className="sidebar__chats">
            <AddNewChat />
            <Rooms searchText={searchText}/>
            </div>
 
        </div>
    )
}

export default Sidebar
