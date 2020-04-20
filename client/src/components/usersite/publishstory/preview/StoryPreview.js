import React from 'react'

export default function StoryPreview({singleStory}) {

  let singleStoryJSX = singleStory.map(story=>{
    return <li>story</li>
  })

  return (
    <ul>
        {singleStoryJSX}
    </ul>
  )
}
