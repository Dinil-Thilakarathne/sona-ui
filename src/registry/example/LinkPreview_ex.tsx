import React from 'react'
import LinkPreview from '../sonaui/linkPreview/LinkPreview'

const LinkPreview_ex = () => {
  return (
    <div>
        <div className='border p-8'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, ullam.
            <LinkPreview link='https://www.google.com' text='Google' className='flex h-full w-full items-center justify-center' />
        </div>
    </div>
  )
}

export default LinkPreview_ex