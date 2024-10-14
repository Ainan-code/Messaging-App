import React, { useState } from 'react'
import GenderCheckbox from './genderCheckbox';
import { Link } from 'react-router-dom';

import UseSignup from '../../../hooks/UseSignup';

function Signup() {

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender})
    
 
   };

  const {loading, signup} = UseSignup();
   const handleSubmit = async(e) => {
   e.preventDefault();
   await signup(inputs);


  }
  
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className='text-3x1 font-semibold text-center text-gray-300'>
            SignUp <span className='text-orange-500' > PingMe</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor='fullName' className='label p-2'>
                <span className=' text-base label-text '> FullName:  </span>
            </label>
            <input type="text" placeholder="John Doe" name='fullName' className="input input-bordered w-full  h-10" value={inputs.fullName} onChange={(e)  => setInputs({...inputs, fullName: e.target.value})} />
        </div>
        <div>
        <label htmlFor='username' className='label p-2'>
                <span className=' text-base label-text '> Username:  </span>
            </label>
            <input type="text" placeholder="John12" name='username' className="input input-bordered w-full  h-10" value={inputs.username} onChange={(e)  => setInputs({...inputs, username: e.target.value})}/>
        </div>
        <div>
        <label htmlFor='password' className='label p-2'>
                <span className=' text-base label-text '> Password:  </span>
            </label>
            <input type="password" placeholder="" name='password' className="input input-bordered w-full  h-10" value={inputs.password} onChange={(e)  => setInputs({...inputs, password: e.target.value})}/>
        </div>
        <div>
        <label htmlFor='confirmPassword' className='label p-2'>
                <span className=' text-base label-text '> Confirm-Password:  </span>
            </label>
            <input type="password" placeholder="" name='confirmPassword' className="input input-bordered w-full  h-10" value={inputs.confirmPassword} onChange={(e)  => setInputs({...inputs, confirmPassword: e.target.value})}/>

        </div>

        <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender = {inputs.gender}  />

        <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' >
						Already have an account?
					</Link>

					<div>
					<button className='btn btn-block btn-sm mt-2 border border-slate-700'disabled={loading} >
       {  loading ? <span className='loading loading-spinner'></span>  : "Signup"  }
  
  </button>
					</div>


      </form>
        </div>
    </div>
  )
}

export default Signup;