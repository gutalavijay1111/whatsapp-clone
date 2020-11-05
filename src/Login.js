import React, { useEffect } from 'react'
import "./Login.css"
import Button from "@material-ui/core/Button"
import { auth, provider } from "./firebase"
import { actionTypes } from './reducer';
import {useStateValue} from "./StateProvider"
import db from "./firebase"
import firebase from "firebase";

function Login() {

    const [{}, dispatch] = useStateValue();
    // window.location.assign('http://localhost:3000/')

    useEffect (() => {
        // window.location.assign('http://localhost:3000/')
    },[])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
            var emails = []

            db.collection("users").where("email", "==", result.user.email)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    emails.push(doc.data().email)
                });
                if (emails.length === 0) {
                    db.collection('users').add({
                        email: result.user.email,
                        name: result.user.displayName,
                        photoUrl: result.user.photoURL,
                    })   
                }
            });

            // Adding User to Welcome Room as soon as Login `_`
            var welcomeRoomRef = db.collection("rooms").doc("AOn7UXHShogADh9apa3Q");
            welcomeRoomRef.update({
                allowed_users: firebase.firestore.FieldValue.arrayUnion(result.user.email)
            })
        })
        .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/766px-WhatsApp.svg.png" alt=""></img>
            <div className="login__text">
                <h1>Sign in to Whatsapp</h1>
            </div>
            <Button type="submit" onClick={signIn}>
                Sign in With Google                
            </Button>
            </div>
        </div>
    )
}

export default Login
