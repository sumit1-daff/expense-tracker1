import React from 'react'

export default function DrawerItem(props) {
  return (
    <>
        <div className="flex justify-center m-auto w-60 my-5 p-5 items-center"> <span className='mr-2'>{props.icon}</span>{props.title} </div>
    </>
  )
}
