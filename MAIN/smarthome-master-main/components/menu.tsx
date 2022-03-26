import React from "react"
import Popup from 'reactjs-popup'
import Link from "next/link"
import styled from "styled-components"
import styles from '../styles/Home.module.css'
import fire from '../pages/api/firebase'

const NavigationWrapper = styled.nav`
display: flex;
width: 60%;
padding-top: 20px;
padding-bottom: 20px;
margin: auto;
justify-content: space-between;
`

const StyledLink = styled.a`
  color: white;
`

const logout = () => {
    fire.auth().signOut();
    location.reload();
    window.location.assign("./anime");
}

const signUp = () => {
    const email = ((document?.querySelector('#email')) as HTMLInputElement).value;
    
    const password = ((document?.querySelector('#password')) as HTMLInputElement).value;

    fire.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Successfully Signed Up');
            fire.auth().signInWithEmailAndPassword(email, password);
            fire.firestore().collection('listusers').doc(fire.auth().currentUser?.uid).set({watched: ""});
            console.log("created");
            setTimeout(() => {  window.location.assign("./anime"); }, 2000);
        })
        .catch((err) => {
            console.log('Error: ' + err.toString());
        })
}

const login = () => {
    const email = ((document?.querySelector('#email')) as HTMLInputElement).value;
    
    const password = ((document?.querySelector('#password')) as HTMLInputElement).value;

    fire.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Successfully Logged In');
            window.location.assign("./anime");
        })
        .catch((err) => {
            console.log('Error: ' + err.toString());
        })
}





export const Menu = () => {

    if (fire.auth().currentUser) {
        return (

            <div className={styles.menu}><NavigationWrapper>

                <Link href="/home" passHref>
                    <StyledLink>Home</StyledLink>
                </Link>
                {/* <Link href="/about" passHref>
                    <StyledLink>About</StyledLink>
                </Link> */}
                <Link href="/anime" passHref>
                    <StyledLink>Anime List</StyledLink>
                </Link>
                <Link href="/account" passHref>
                    <StyledLink>Account</StyledLink>
                </Link>
                <button onClick={logout}>Logout from: {fire.auth().currentUser?.email}</button>
            </NavigationWrapper></div>

        );
    }
    else {

        return (

            <div className={styles.menu}><NavigationWrapper>

                <Link href="/home" passHref>
                    <StyledLink>Home</StyledLink>
                </Link>
                
                {/* <Link href="/about" passHref>
                    <StyledLink>About</StyledLink>
                </Link> */}

                <Link href="/anime" passHref>
                    <StyledLink>Anime List</StyledLink>
                </Link>

                <Popup trigger={<button> Login/Register </button>} modal nested>
                    {close =>   (
                        <div className={styles.modal}>
                            <button className={styles.close} onClick={(close)}>X</button>
                            <div className={styles.header}> Login/Register </div>

                            <div className={styles.content}>
                                {/* {' '} */}
                                <main>
                                    <div className={styles.actions}>
                                        <div>
                                            <div>Email</div>
                                            <input id="email" placeholder="Enter Email" type="text" />
                                        </div>
                                        <div>
                                            <div>Password</div>
                                            <input id="password" placeholder="Enter Password" type="password" />
                                        </div>
                                        <div className={styles.btn}>
                                            <button onClick={login}>Login</button>
                                            <button onClick={signUp}>Sign Up</button>
                                        </div>
                                        {/* <div>
                                            <button onClick={}>Facebook</button>
                                            <button onClick={}>Google</button>
                                        </div> */}
                                    </div>

                                </main>
                            </div>
                            <div className={styles.loginadd}>
                                <h2>Additions</h2>
                                <ul>
                                    <li>We don't store your personal data</li>
                                    <li>Registration and login through Facebook, Google, etc.. will be added in next update</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </Popup>
                {/* <Link href="/Login" passHref>
                <StyledLink>Login or Register</StyledLink>
            </Link> */}
            </NavigationWrapper></div>

        );
    }

}