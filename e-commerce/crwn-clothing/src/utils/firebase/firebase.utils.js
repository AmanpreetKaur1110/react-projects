import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

// doc method is retrieve documents inside of our firestore database.

const firebaseConfig = {
    apiKey: "AIzaSyC-jzFjbKh_ldwgEi8YrkObsRbtf8GfjjA",
    authDomain: "crwn-clothing-db-a02b9.firebaseapp.com",
    projectId: "crwn-clothing-db-a02b9",
    storageBucket: "crwn-clothing-db-a02b9.firebasestorage.app",
    messagingSenderId: "377550635308",
    appId: "1:377550635308:web:de12d763acb895f30bac89"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:"select_account"
  });
   
 export const auth = getAuth();
 export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

 export const db = getFirestore();

 export const createUserDocumentFromAuth = async (userAuth) =>{
  const userDocRef = doc(db,'users',userAuth.uid)

  const userSnapshort = await getDoc (userDocRef);

  // if user data does not exist
 // create /set the document with the data from userAuth in my collection
  if (!userSnapshort.exists()){
    const {displayName , email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });
    }catch (error){
       console.log('error creating the user',error.message);
    }
  }
  // if user data exists
  // return userDocRef
   return userDocRef ;
 };