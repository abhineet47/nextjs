import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';
import { sendNotificationDetailsApi } from '../actions/jobsApi'
const firebaseCloudMessaging = {
    //checking whether token is available in indexed DB
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token');
    },
    //initializing firebase app
    init: async function () {
        if (!firebase.apps.length) {


            firebase.initializeApp({
                apiKey: "AIzaSyD3qoiVtX-xaqX-I4sTUtj5IlaY86BLrpc",
                authDomain: "theincircleweb.firebaseapp.com",
                databaseURL: "https://theincircleweb.firebaseio.com",
                projectId: "theincircleweb",
                storageBucket: "theincircleweb.appspot.com",
                messagingSenderId: "331387902605",
                appId: "1:331387902605:web:0cc1b1ae2b0caa1d9a20c4",
                measurementId: "G-4FR5BDTQY3"
            });
            try {


                const messaging = firebase.messaging();
                messaging.onMessage((message) => console.log('foreground ', message));

                const tokenInLocalForage = await this.tokenInlocalforage();



                //if FCM token is already there just return the token
                if (tokenInLocalForage !== null) {
                    let obj = {
                        fcmToken: tokenInLocalForage,
                    }
                    var b = document.cookie.match('(^|;)\\s*' + 'userId' + '\\s*=\\s*([^;]+)');
                    if (b) {
                        b = b ? b.pop() : '';
                        if (b) {
                            obj.userId = b;
                        }

                    }
                    sendNotificationDetailsApi(obj)
                    return tokenInLocalForage;

                }

                //requesting notification permission from browser
                const status = await Notification.requestPermission();
                if (status && status === 'granted') {


                    //getting token from FCM
                    const fcm_token = await messaging.getToken();
                    if (fcm_token) {
                        //setting FCM token in indexed db using localforage
                        localforage.setItem('fcm_token', fcm_token);
                        // localstorage.setItem('fcm_token', fcm_token);
                        localStorage.setItem('fcm_token', fcm_token);
                        let obj = {
                            fcmToken: fcm_token,
                        }
                        var b = document.cookie.match('(^|;)\\s*' + 'userId' + '\\s*=\\s*([^;]+)');
                        if (b) {
                            b = b ? b.pop() : '';
                            if (b) {
                                obj.userId = b;
                            }

                        }

                        sendNotificationDetailsApi(obj)

                        //return the FCM token after saving it
                        return fcm_token;
                    }
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
};
export { firebaseCloudMessaging };