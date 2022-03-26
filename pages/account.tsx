import React from 'react';
import fire from './api/firebase';
import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import BarChart from "../components/chart"
import Popup from 'reactjs-popup'

const user = fire.auth().currentUser;

const changePass = () => {
    const newPass = ((document?.querySelector('#newPass')) as HTMLInputElement).value;
    user?.updatePassword(newPass).then(

    );
    alert("Password changed");
}
const Account = () => {



    return (
        <main className={styles.body}>
            <div>
                <Menu></Menu>
                <div className={styles.screencenter}>
                    <Popup trigger={<button> Account Details </button>} modal nested>
                        {close => (
                            <div className={styles.modal}>
                                <button className={styles.close} onClick={close}>X</button>
                                <div className={styles.header}> Account Details </div>

                                <div className={styles.content}>
                                    {/* {' '} */}
                                    <main>
                                    <p>Email: {fire.auth().currentUser?.email}</p>
                                            <p>UID: {fire.auth().currentUser?.uid}</p>
                                        <div className={styles.loginadd}>
                                        </div>
                                        <div className={styles.actions}>
                                            <div>
                                                <div>New Password</div>
                                                <input id="newPass" placeholder="Enter new password" type="password" />
                                            </div>
                                            <div className={styles.btn}>
                                                <button onClick={changePass} >Change Password</button>
                                            </div>

                                        </div>
                                    </main>
                                </div>



                            </div>
                        )}
                    </Popup>
                </div>



                <BarChart></BarChart>
            </div>
        </main>

    )


}

export default Account;