'use client'
import React, { useEffect, useState } from 'react'
import PromptCards from './PromptCards'
import PromptCardsList from './PromptCardsList'

const Feed = () => {
  
  const [searchText,setSearchText] = useState('')
  const [posts,setPosts] = useState([])
  const [filteredPost,setFilteredPost] = useState([])

  const handelSearchChange = (e) => {
    setSearchText(e.target.value)
    const filterPost = posts.filter( p => {
      if(p.creator.username.includes(e.target.value) || p.prompt.includes(e.target.value) || p.tag.includes(e.target.value)){
        return p
      }
    })
    setFilteredPost(filterPost)
  }

  const handelTagClick = (tag) => {
    const filterPost = posts.filter( p => {
      if(p.tag.includes(tag)){
        return p
      }
    })
    setFilteredPost(filterPost)
  }

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data)
      setFilteredPost(data)
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
      data = {filteredPost}
      handelTagClick = {handelTagClick}
      />
    </section>
  )
}

export default Feed