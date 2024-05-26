'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from '@components/Form'

const UpdatePost = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  const postId = searchParams.get('id')
  const [submitting ,setSubmitting] = useState(false)
  const [post,setPost] = useState({
    prompt:'',
    tag:''
  })

  useEffect(() => {
    const updatePost = async () => {
        const response = await fetch(`/api/prompt/${postId}`)
        const data = await response.json()

        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
      }
    if(postId)
        updatePost()
  }, [postId])

  const updatePrompt  = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    if(!postId)
        alert("prompt id not found")
    
    try {
      const response = await fetch(`/api/prompt/${postId}`,{
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag:post.tag
        })
      })

      if(response.ok){
        router.push('/profile')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
    type = 'Edit'
    post = {post}
    setPost = {setPost}  
    submitting = {submitting}
    handelSubmit = {updatePrompt}
    />
  )
}
const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePost />
    </Suspense>
  );
};

export default UpdatePromptPage;