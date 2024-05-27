'use client'
import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'


const UserProfile = ( {params}) => {

    const [profile,setProfile] = useState({})
    const [posts,setPosts] = useState([])
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(()=>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params.id}/posts`);
          const data = await response.json();
          setPosts(data)
        }
        const fetchProfile = async () => {
            const response = await fetch(`/api/users/${params.id}`);
            const data = await response.json();
            console.log(data)
            setProfile(data)  
        }

        if(params.id){
            fetchPosts();
            fetchProfile();

        }
      },[])


    return (
        <Profile
            name = {profile.username+"'s"}
            desc = {`Welcome to ${profile.username}'s profile here you can find some usefull prompts for AI-powered platforms.`}
            data = {posts}
        />

    )
}

export default UserProfile