import React from 'react'

function Contentbg({ content }) {
    return (
        <div className='flex flex-col items-center'>
            <div className='z-50 overflow-hidden'>
                <img className='w-60' src="./background.png" alt='background' />
            </div>
            <div className='z-30 pb-52 w-[90%] flex flex-col rounded-lg justify-center items-center bg-white h-[95%]'>
                <div className='flex flex-wrap p-4 text-lg font-bold'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Contentbg
