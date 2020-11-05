import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import db from "./firebase"
import {useStateValue} from "./StateProvider"


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

 function SimpleDialog(props) {
  const [{ user }, dispatch] = useStateValue();
  const [emails, setEmails] = useState([]);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([user.email]);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      console.log("pushing.>>>", value);
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked)

    console.log("This is the checkbox status>> ",newChecked);
    props.handleCheckList(newChecked);
  };

  
    useEffect(() => {
      db.collection('users').onSnapshot((snapshot) => 
          ( setEmails(
              snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
              }))
          ))
      );
  }, []);

  return (
    <List dense className={classes.root}>
      {emails.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem key={value.id} button>
            <ListItemAvatar>
              <Avatar
                alt=""
                src={`${value.data.photoUrl}`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={` ${value.data.name}`} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value.data.email)}
                checked={checked.indexOf(value.data.email) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>

  );
}

export default SimpleDialog;