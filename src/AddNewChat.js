// import React, { useState } from 'react'
// import SimpleDialog from './SimpleDialog';
// function AddNewChat() {

//     const createChat = () => {
//         const roomName = prompt("Enter a name for you Room")
//     }

//     const open = () => {

//     }
//     return (
//         <div className="sidebarChat" onClick={<SimpleDialog />} >
//             <h3>Add a Room</h3>
//         </div> 
//     )
// }

// export default AddNewChat

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleDialog from "./SimpleDialog"
import "./AddNewChat.css"
import db from "./firebase"
import TextField from '@material-ui/core/TextField'
import {useStateValue} from "./StateProvider"

export default function ScrollDialog() {
    const [{user}, dispatch] = useStateValue();
    const [checkedUser, setCheckedUser] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [roomName, setRoomName] = React.useState('')

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkList = (checked) => {
    console.log("This is from checkList handler",checked)
    setCheckedUser(checked)
  }

  const handleText = (e) => {
      e.preventDefault()
      setRoomName(e.target.value)
  }

  const createGroup = () => {
      setOpen(false)
      console.log("this is from createGroup")
      console.log("Group created with this users>>",checkedUser)
    
      if (!checkedUser.includes(user.email)) {
          checkedUser.push(user.email)
      }

      if (roomName === "" ) {
        alert("Please enter a Room Name😉✌");

    }
    else {     
        db.collection("rooms").add({
            name: roomName,
            allowed_users: checkedUser,
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

        setCheckedUser([])
        setRoomName('')
    }
}


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Add Chat Room</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">New Chat Room 🌈</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        <TextField className="addNewChat__input" id="standard-basic" label="Room Name" onChange={ (e) => handleText(e)}/>
        <SimpleDialog handleCheckList={checkList}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createGroup} color="primary">
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}