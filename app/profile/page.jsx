'use client'
import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'


const MyProfile = () => {

    const [posts,setPosts] = useState([])
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(()=>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data)
        }

        if(session?.user.id){
            fetchPosts();
        }
      },[])

    const handelEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handelDelete = async (post) => {
        const hasConfirmed = confirm("Are you want to delete this prompt")
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id}`,{
                    method:'DELETE'
                })

                const filterPost = posts.filter(p => p._id != post._id)
                setPosts(filterPost)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name = "My "
            desc = "Welcome to your personilozed profile page"
            data = {posts}
            handelEdit = {handelEdit}
            handelDelete = {handelDelete}
        />

    )
}

export default MyProfile