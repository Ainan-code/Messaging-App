import React from 'react';
import { IoSearch } from "react-icons/io5";
import useConversation from '../../store/useConversation';
import useGetConversations from '../../hooks/useGetConversations'
import toast from 'react-hot-toast';
import { useState } from "react";

const SearchInput = () => {

  const [search, setSearch] = useState("");
  const {setSelectedConversation}  = useConversation()
  const {conversations}   =  useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    
    if (search < 3) {
    return   toast.error("search must be more than 3 characters")
    }

    const conversation  = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase())) 
    if(conversation) {
      setSelectedConversation(conversation)
      setSearch('')

    }
    else {
      toast.error("NO such user found")
    }

  }

  return (
    <div>
        <form className='flex items-center gap-2'onSubmit={handleSubmit} >
          <input type="text" placeholder='search' className='input input-bordered rounded-full'
          value={search}    onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit' className='btn btn-circle bg-sky-500 text-white '>
          <IoSearch className='w-6 h-6 outline-none'/>
          </button>
        </form>
    </div>
  )
}

export default SearchInput;