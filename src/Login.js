import React from 'react'
import "./Login.css"
import Button from "@material-ui/core/Button"
import { auth, provider } from "./firebase"
import { actionTypes } from './reducer';
import {useStateValue} from "./StateProvider"
import db from "./firebase"

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })

            // db.collection('users').add({
            //     email: result.user.email,
            //     name: result.user.displayName,
            //     photUrl: result.user.photoURL,
            // })
            var emails = []

            db.collection("users").where("email", "==", result.user.email)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    emails.push(doc.data().email)
                });
                console.log("Theese are you emails>>>>>>>>",emails)
                console.log("this is reult.email>>>", result.user.email)
                console.log("thisis the length>>> ", emails.length)
                if (emails.length === 0) {
                    db.collection('users').add({
                        email: result.user.email,
                        name: result.user.displayName,
                        photoUrl: result.user.photoURL,
                    })   
                }
            });


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
