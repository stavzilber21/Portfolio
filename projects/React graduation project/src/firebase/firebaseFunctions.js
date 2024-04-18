import db from '../firebase';
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"

export async function add(collectionName, obj){
    addDoc(collection(db, collectionName), obj)
    alert("The user added to firebase!");
}