import db from '../firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"

export async function add(collectionName, obj){
    addDoc(collection(db, collectionName), obj);
}

export async function remove(collectionName, id){
    deleteDoc(doc(db, collectionName,id));
}

export async function update(collectionName, id,obj){
    await updateDoc(doc(db, collectionName, id),obj);
}