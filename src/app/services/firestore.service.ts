import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database:AngularFirestore) { }
//genera un documento en la base de datos
  creatDoc(data: any, path: string, id: string){
    const collection= this.database.collection(path);
    return collection.doc(id).set(data)
  }
  //lee los datos del cocumento de la base date
  getDoc(path: string, id:string){
    const collection= this.database.collection(path); //apuntamos a la coleccion
    return collection.doc(id).valueChanges(); //apuntamos a la collecion el id y vemos el observable
  }

  delateDoc(path: string, id:string){
    const collection= this.database.collection(path); //apuntamos a la coleccion
    return collection.doc(id).delete();
  }
  //actializa los datos de la base de datos
  updateDoc(data: any, path: string, id: string){
    const collection= this.database.collection(path); //apuntamos a la coleccion
    return collection.doc(id).update(data);
  }
  //crea in id 
  getId(){
    return this.database.createId();
  }
  //obtiene toda la coleccion
  getCollection<tipo>(path: string){
    const collection= this.database.collection<tipo>(path); //apuntamos a la coleccion
    return collection.valueChanges();//valueChanges() es un observable que obtiene todos los datos pero en tiempo real

  }
}
