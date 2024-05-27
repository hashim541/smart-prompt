'use client'
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const PromptCards = ({ post, handelTagClick, handelEdit, handelDelete }) => {

    const [copied,setCopied] = useState("") 
    const {data: session} = useSession()
    const router = useRouter()
    const pathName = usePathname()

    const handelCopy = ({prompt}) => {
        setCopied(prompt)
        navigator.clipboard.writeText(prompt)
        setTimeout(() => {
            setCopied("")
        }, 3000)
    }


    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div 
                className="cursor-pointer flex-1 flex justify-start items-center gap-3"
                onClick={() => {
                    console.log()
                    if(session?.user.id == post.creator._id)
                        router.push('/profile')
                    else
                        router.push(`/profile/${post.creator._id}`)
                }}
                >
                    <Image
                    src = {post.creator.image}
                    alt = "user image"
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
                        <p className="text-sm font-inter text-gray-500">{post.creator.email}</p>
                    </div>
                </div>

                <div 
                className="copy_btn"
                onClick={() => handelCopy(post)}                    
                >
                    <Image
                    src={copied != post.prompt ? "/assets/icons/copy.svg": "/assets/icons/tick.svg"}
                    width={12}
                    height={12}
                    alt="Copy prompt"
                    />
                </div>
            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
            <p 
            className="font-inter text-sm cursor-pointer blue_gradient"
            onClick={()=> handelTagClick && handelTagClick(post.tag)}
            >{post.tag}</p>
            {session?.user.id == post.creator._id && pathName == '/profile' &&
            (
                <div className="mt-5 flex-center gap-4 border-t pt-3 border-gray-100">
                    <p 
                        className = "font-inter text-sm green_gradient cursor-pointer"
                        onClick = {() => handelEdit(post)}    
                    >Edit</p>
                    <p 
                        className="font-inter text-sm orange_gradient cursor-pointer"
                        onClick = {() => handelDelete(post)}    
                    >Delete</p>
                </div>
            )}
        </div>
    )
}

export default PromptCards