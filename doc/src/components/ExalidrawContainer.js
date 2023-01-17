import React from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";

const ExalidrawContainer = ({data}) => {
return (
  <div className='excalidraw-wrapper'>
    <Excalidraw initialData={data}/>
  </div>
  )
}

export default ExalidrawContainer