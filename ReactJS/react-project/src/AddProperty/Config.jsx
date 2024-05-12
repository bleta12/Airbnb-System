
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBiM__QXczC-rOaYChNIaCvMh1hgXmg8vY",
  authDomain: "imageuploaddb-a3324.firebaseapp.com",
  projectId: "imageuploaddb-a3324",
  storageBucket: "imageuploaddb-a3324.appspot.com",
  messagingSenderId: "432491659567",
  appId: "1:432491659567:web:962226ce698a3aa09e21da"
};


const app = initializeApp(firebaseConfig);

export const imageDb= getStorage(app)