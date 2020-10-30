import React, {useEffect, useState} from 'react'
import "./Chat.css"
import Avatar from "@material-ui/core/Avatar";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function Chat() {
    const [input, setInput] = useState('');   
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input)
        setInput("");
    }

    return (
        <div className="chat">
            {/* Chat Header */}
            <div className="chat__header">
                {/* avatars */}
                <Avatar  src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                {/* Header Info */}
                    <div className="chat__headerInfo">
                        <h3>Room Name</h3>
                        <p>Last seen at ....</p>
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
                <p className={`chat__message ${true &&'chat__reciever'}`}>
                    <span className="chat__name">Vijaykumar</span>
                    Hey Guyzz!!
                    <span className="chat__timestamp">11.08pm</span>
                </p>
                <p className="chat__message">Hey Guyzz!!</p>
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
    )
}

export default Chat
