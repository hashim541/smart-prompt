
import React from 'react'
import PromptCardsList from './PromptCardsList'
import PromptCards from './PromptCards'


const Profile = ({ name, desc, data, handelEdit, handelDelete }) => {
  return (
    <section className="w-full">
        <h1 className='head_text text-left blue_gradient'>{name} Profile</h1>
        <p className='desc text-left'>{desc}</p>
        <div className="mt-10 prompt_layout">
            {data.map(post => (
                <PromptCards
                key={post._id}
                post={post}
                handelEdit={() => handelEdit && handelEdit(post)}
                handelDelete={() => handelDelete && handelDelete(post)}
                />
            ))}
        </div>
    </section>
  )
}

export default Profile