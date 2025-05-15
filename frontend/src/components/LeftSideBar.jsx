import React from 'react'
import Plus from '../assets/icons and logos/plus.svg'
import Note from '../assets/icons and logos/note.svg'
import Todo from '../assets/icons and logos/todo.svg'
import Setting from '../assets/icons and logos/settings.svg'
import AiImg from '../assets/icons and logos/ai.svg'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setShowCreateModal } from '../slices/showCreateModal'
import { setShowChatBot } from '../slices/showChatBotSlice'
const LeftSideBar = () => {
  const dispatch=useDispatch()
  return (
    <div className="flex side-bar-mediaq flex-col  justify-between w-16 bg-white fixed shadow-right h-[calc(100vh-16px)] top-[2.74rem]">
      <div className="top side-bar-content-mediaq flex flex-col gap-2 p-2">
      <div className="create bg-blue-500 p-3 rounded-lg hover:bg-blue-400" onClick={()=>dispatch(setShowCreateModal(true))}>
      <img className="m-auto w-[26px]" src={Plus} alt="create" />
      </div>
      <div className="todosBar transition-transform duration-350 ease-in-out hover:bg-gray-100 p-2 rounded-lg">
        <Link to={'/todos'} className='flex flex-col gap-1 items-center text-[14px]'>
      <img className="m-auto w-[28px]" src={Todo} alt="Todos" />
        <div className='text-center text-gray-500 w-fit'>Todos</div>
        </Link>
      </div>
      <div className="notesBar transition-transform duration-350 ease-in-out hover:bg-gray-100 p-2 rounded-lg">
      <Link to={'/notes'} className='flex flex-col gap-1 items-center text-[14px]'>
      <img className="m-auto w-[28px]" src={Note} alt="Notes" />
      <div className='text-center text-gray-500  w-fit'>Notes</div>
      </Link>
      </div>
      <div onClick={()=>dispatch(setShowChatBot(true))} className="chat-bot transition-transform duration-350 ease-in-out hover:bg-gray-100 p-2 rounded-lg">
      
      <img className="m-auto w-[28px]" src={AiImg} alt="Ai" />
     
      </div>
      </div>
      <div className="bottom relative bottom-[7%]">
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