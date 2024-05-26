'use client'
import React, { useEffect, useState } from 'react'
import PromptCards from './PromptCards'
import PromptCardsList from './PromptCardsList'

const Feed = () => {
  
  const [searchText,setSearchText] = useState('')
  const [posts,setPosts] = useState([])

  const handelSearchChange = (e) => {
    setSearchText(e.target.value)
  }
  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
        type="text"
        placeholder="Search for tag or user name"
        value={searchText}
        onChange={e => handelSearchChange(e)}
        required
        className='search_input peer'
        />
      </form>
      <PromptCardsList
      data = {posts}
      handelTagClick = {() => {}}
      />
    </section>
  )
}

export default Feed