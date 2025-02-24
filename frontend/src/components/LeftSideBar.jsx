import React from 'react'
import Plus from '../assets/icons and logos/plus.svg'
import Note from '../assets/icons and logos/note.svg'
import Todo from '../assets/icons and logos/todo.svg'
import Setting from '../assets/icons and logos/settings.svg'
import {Link} from 'react-router-dom'
const LeftSideBar = () => {
  return (
    <div className="flex flex-col gap-75 w-16 fixed shadow-right min-h-screen top-[2.74rem]">
      <div className="top flex flex-col gap-5 p-2">
      <div className="create bg-blue-500 p-3 rounded-lg hover:bg-blue-400">
      <img className="m-auto w-[26px]" src={Plus} alt="create" />
      </div>
      <div className="todos transition-transform duration-350 ease-in-out hover:rotate-x-[18deg] hover:rotate-z-[-26deg] hover:rotate-y-[28deg] p-2 rounded-lg">
        <Link to={'/todos'}>
      <img className="m-auto w-[28px]" src={Todo} alt="Todos" />
        </Link>
      </div>
      <div className="notes transition-transform duration-350 ease-in-out hover:rotate-x-[18deg] hover:rotate-z-[-26deg] hover:rotate-y-[28deg] p-2 rounded-lg">
      <Link to={'/notes'}>
      <img className="m-auto w-[28px]" src={Note} alt="Notes" />
      </Link>
      </div>
      </div>
      <div className="bottom">
      <div className="settings transition-transform duration-300 ease-in-out hover:rotate-90">
        <Link to={'/settings'}>
      <img className="m-auto w-[30px]" src={Setting} alt="Settings" />
        </Link>
      </div>
      </div>
    </div>
  )
}

export default LeftSideBar