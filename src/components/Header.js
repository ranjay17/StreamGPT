import logo from '../assets/logo.png';
import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';


const Header = () => {
  const user = useSelector(store=>store.user);
  const navigate = useNavigate();

  const handleSignout = () =>{
    signOut(auth).then(() => {
      navigate("/")
}).catch((error) => {
  navigate("/error")
});
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
      className="w-44"
      src={logo}
      alt="logo"
      />
      {user && (<div className="flex p-2">
        <img
        className="w-12 h-12"
        src= {user.photoURL}
        alt="userIcon"
        />
        <button className="text-white font-bold" onClick={handleSignout}>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header

