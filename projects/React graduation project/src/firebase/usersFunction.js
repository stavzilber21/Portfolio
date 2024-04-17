import db from '../firebase';
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"

export async function registerUser(user){
    addDoc(collection(db, "users"), user)
    alert("The user added to firebase!")
}