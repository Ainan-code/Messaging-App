import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import useLogout from '../../../hooks/useLogout';
const LogoutButton = () => {

  const {logout} = useLogout();
  return (
    <div className='mt-auto '>
        <RiLogoutCircleLine className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />

    </div>
   
  )
}

export default LogoutButton;