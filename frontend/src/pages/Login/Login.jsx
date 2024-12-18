import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    const{loading, login}  = useLogin()

   const handleSubmit = (e) => {
    e.preventDefault();
    login({username, password})
   }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>        
            <h1 className='text-3x1 font-semibold text-center text-gray-300'>
            Login <span className='text-orange-500' > PingMe</span>
      </h1>
       

        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="username" className='label p-2'>
                <span className=' text-base label-text '> Username  </span>
            </label>
            <input type="text" placeholder="Enter username" className="input input-bordered w-full  h-10" value={username}
               onChange={(e)  =>  setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className='label p-2'>
                <span className=' text-base label-text'> Password  </span>
            </label>
            <input type="password" placeholder="Enter password" className="input input-bordered w-full  h-10" 
            value={password}   onChange={(e)  =>  setPassword(e.target.value)}   />
          </div>

          <Link to={"/signup"} className=" text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Dont have an account</Link>
          <div>
            <button className='btn btn-block btn-sm mt-2 ' disabled={loading}>
              
              { loading ? <span className="loading loading-spinner"></span> :    "Login"}</button>
          </div>

        </form>


        </div>
    </div>
  )
}


export default Login;