import React from 'react'

function Contentbg({ content }) {
    return (
        <div className='flex flex-col rounded-lg items-center bg-white'>
            <img className='w-60 h-60' src="./background.svg" alt='background' />
            <div className='flex flex-wrap p-4 text-lg font-bold'>
                {content}
            </div>
        </div>
    )
}

export default Contentbg
