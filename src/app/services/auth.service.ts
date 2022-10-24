import { Injectable } from '@angular/core';
import { sendEmailVerification } from 'firebase/auth';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { signInWithPopup, authInstance$, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import {AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { Observable,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs:AngularFirestore) { 
    this.user$= this.afAuth.authState.pipe(
      switchMap((user)=>{
        if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

async login(email:string, password: string):Promise<User>{
 
  try{
    const { user }= await this.afAuth.signInWithEmailAndPassword(email,password);
    this.updateUserDate(user);
    return user;
  }
  catch(error){
    console.log('error->', error);
  }  
}
async logout():Promise<void>{
  try{
    await this.afAuth.signOut();
  }
  catch(error){
    console.log('error->', error);
  } 
}
async register(email:string, password: string):Promise<User>{
  try{
    const { user }= await this.afAuth.createUserWithEmailAndPassword(email,password);
    await this.sendEmailVerificationEmail();
    return user;
  }
  catch(error){
    console.log('error->', error);
  }
}
async loginGoogle():Promise<User>{
  try{
    const { user }= await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.updateUserDate(user);
    return user;
  }
  catch(error){
    console.log('error->', error);
  } 
}
async resetPassword(email:string):Promise<void>{
  try{
    return  this.afAuth.sendPasswordResetEmail(email);
   
  }
  catch(error){
    console.log('error->', error);
  }
}
async sendEmailVerificationEmail():Promise<void>{
  try{
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
  catch(error){
    console.log('error->', error);
  } 
}
 siEmailVerificado(user:User):boolean{
  return user.emailVerified=== true? true :false; //si el emailes verificado devuelve true sino false
}
private updateUserDate(user:User){
  const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  const data:User={
    uid:user.uid,
    email:user.email,
    emailVerified: user.emailVerified,
    displayName:user.displayName,
  };
  return userRef.set(data, { merge:true});
}

}
