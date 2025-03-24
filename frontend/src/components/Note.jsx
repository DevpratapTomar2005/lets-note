import deleteTodoImg from '../assets/icons and logos/delete.svg'
const Note = () => {
  return (
    <div className="flex flex-col justify-between pt-3 pb-1 px-2 outline-2 outline-purple-800 h-[100%] w-[300px] my-2 rounded-md" >
        <div className="flex justify-between items-center">
       
            <div className="flex gap-2"> 
            <span className="text-purple-600 w-[250px] font-medium text-lg hover:underline hover:cursor-pointer"><h2>This is our note that we write</h2></span>
            </div>
            <div className='p-1 hover:bg-gray-100 rounded-full' >
            <img src={deleteTodoImg} className='w-[23px] opacity-[0.8]' alt="delete" />
            </div>
         </div>
          <div className='mt-3 flex justify-between'>
           <span className='text-[11px] text-purple-400 cursor-default hover:text-purple-700'>created at: 10/3/2025</span>
           <span className='text-[11px] text-purple-400 cursor-default hover:text-purple-700'>updated at: 10/3/2025</span>
          </div>
    </div>
  )
}

export default Note