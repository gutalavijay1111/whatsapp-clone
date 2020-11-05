import React, { useState, useEffect } from 'react'
import SidebarChat from "./SidebarChat"
import db from "./firebase"

function Rooms(props) {
    console.log("This is the searchtext from props>>", props.searchText);
    const [roomName, setRoomName] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const rooms_data = rooms
    console.log("this is the actual data", rooms_data)

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => 
            ( setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )));
    }, []);

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => 
            ( setRoomName(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name.toLowerCase(),
                }))
            )));
    }, []);

    var tempSearchResult = []

    useEffect(() => {
        roomName.map((item) => {
            if (item.name.includes(props.searchText.toLowerCase())){
                tempSearchResult.push(item)
                console.log("Pushing this to search result",item)
            }
        })
        setSearchResult(tempSearchResult)
    }, [props.searchText]);


    console.log("These are the final results>>>",searchResult)

    const goBack = () => {
        setSearchResult('')
    }


    return props.searchText.length === 0 ? (
            <div className="rooms">
                {rooms.map(room => (
                    <SidebarChat key={rooms.id} id={room.id}
                        name={room.data.name} />
                ))}
            </div>
    ) : ( 
            (searchResult.length <= 0) ? (
                <div className="rooms">
                {rooms.map(room => (
                    <SidebarChat key={rooms.id} id={room.id}
                        name={room.data.name} />
                ))}
            </div>
            ) : (
                <div>
                    <div className="search__suggestions" >
                        {searchResult.map(room => (
                            <SidebarChat  id={room.id}
                                name={room.name} />
                        ))}
                    </div>
                    <button onClick={goBack} >Go Back</button> 
                </div>
            )
        )
    }


export default Rooms
