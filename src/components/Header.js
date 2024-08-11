import logo from '../assets/logo.png';
import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {onAuthStateChanged} from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import { toggleSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const user = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  const handleSignout = () =>{
    signOut(auth).then(() => {
}).catch((error) => {
  navigate("/error")
});
  }

  const handleGptSeach = () =>{
    //toggle gpt view
    dispatch(toggleSearchView())
  };

  const handleLanguageChane = (e) =>{
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    const {uid, email, displayName, photoURL} = user;
    dispatch(
      addUser({
        uid: uid, 
        email: email, 
        displayName: displayName, 
        photoURL: photoURL
      }));
      navigate("/browse")
  } else {
    dispatch(removeUser())
    navigate("/")
  }
});
// unsubscribe when component unmount
return () => unsubscribe()
  },[dispatch, navigate]);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
      className="w-44"
      src={logo}
      alt="logo"
      />
      {user && (
        <div className="flex p-2">
          {showGptSearch &&(
          <select 
          className='p-2 m-2 bg-gray-900 text-white' 
          onChange={handleLanguageChane}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="french">French</option>
          </select>)}
          <button 
          className='py-2 px-4 mx-4 bg-purple-700 text-white rounded-lg my-2' 
          onClick={handleGptSeach}>
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
        <img
        className="w-12 h-12 mx-2 my-2"
        src= {user.photoURL}
        alt="userIcon"
        />
        <button className="text-white font-bold" onClick={handleSignout}>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header

