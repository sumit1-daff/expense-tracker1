import React from 'react'

export default function DrawerItem(props) {
  return (
    <>
        <div className="flex justify-center m-auto w-60 my-5 p-5 items-center  rounded-3xl cursor-pointer hover:bg-blue-400 hover:text-white active:bg-blue-400 active:text-white "> <span className='mr-2'>{props.icon}</span>{props.title} </div>
    </>
  )
}
