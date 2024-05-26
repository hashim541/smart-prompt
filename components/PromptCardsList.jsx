import PromptCards from './PromptCards'


const PromptCardsList = ({ data, handelTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
        {data.map(post => (
            <PromptCards
            key={post._id}
            post={post}
            handelTagClick={handelTagClick}
            />
        ))}
    </div>
  )
}

export default PromptCardsList