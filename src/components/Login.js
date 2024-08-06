import Header from "./Header"
import {useState, useRef} from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick= () =>{
    // validate the user
    const nameValue = isSignInForm ? null : name.current.value;
    const message = checkValidData(email.current.value, password.current.value, nameValue);
    setErrorMessage(message);

    if(message) return;

    // sign up
    if(!isSignInForm){
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value
      )
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
    displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/145134469?v=4"
}).then(() => {
  const {uid, email, displayName, photoURL} = auth;
    dispatch(
      addUser({
        uid: uid, 
        email: email, 
        displayName: displayName, 
        photoURL: photoURL
      }));
  navigate("/browse")
}).catch((error) => {
  setErrorMessage(error.message);
});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });
    }
    // sign in
    signInWithEmailAndPassword(
      auth, 
      email.current.value, 
      password.current.value)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    navigate("/browse");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
  }


  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg"
         alt="" />
      </div>
         <form 
         onSubmit={(e)=>e.preventDefault()}
         className="w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
          {!isSignInForm && (
          <input 
          ref={name}
          type="text"
          placeholder="Full Name" 
          className="my-4 p-4 w-full bg-gray-700"
          />)}
          <input 
          ref={email}
          type="text" 
          placeholder="Email Address" 
          className="my-4 p-4 w-full bg-gray-700" 
          />
          <input 
          ref={password}
          type="text"
          placeholder="Password" 
          className="my-4 p-4 w-full bg-gray-700"
          />
          <button className="p-4 my-6 bg-red-700 w-full"
           onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="font-bold text-lg text-red-600 py-2">{errorMessage}</p>
          <p className="py-4 cursor-pointer" 
          onClick={toggleSignInForm}>
            {isSignInForm ? 
            "New to Stream ? Sign Up Now": "Already registered Sign In Now"}
            </p>
         </form>
    </div>
  )
}

export default Login
