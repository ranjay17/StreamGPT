import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVTAR, BACKGROUND_IMG } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    // Validate the user
    const nameValue = isSignInForm ? null : name.current.value;
    const message = checkValidData(email.current.value, password.current.value, nameValue);
    setErrorMessage(message);

    if (message) return;

    try {
      if (!isSignInForm) {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_AVTAR
        });

        // Ensure auth.currentUser is available before accessing its properties
        const currentUser = auth.currentUser;
        if (currentUser) {
          const { uid, email, displayName, photoURL } = currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL
            })
          );
        } else {
          throw new Error("User profile could not be updated.");
        }
      } else {
        // Sign in
        await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(`${errorCode}: ${errorMessage}`);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BACKGROUND_IMG} alt="" />
      </div>
      <form 
        onSubmit={(e) => e.preventDefault()}
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
          />
        )}
        <input 
          ref={email}
          type="text" 
          placeholder="Email Address" 
          className="my-4 p-4 w-full bg-gray-700" 
        />
        <input 
          ref={password}
          type="password" // Change to password type
          placeholder="Password" 
          className="my-4 p-4 w-full bg-gray-700"
        />
        <button className="p-4 my-6 bg-red-700 w-full"
          onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {errorMessage && <p className="font-bold text-lg text-red-600 py-2">{errorMessage}</p>}
        <p className="py-4 cursor-pointer" 
          onClick={toggleSignInForm}>
          {isSignInForm ? 
            "New to Stream? Sign Up Now" : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
