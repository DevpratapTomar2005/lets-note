import verticalDots from '../assets/icons and logos/vertical_dots.svg'
import clock from '../assets/icons and logos/clock.svg'
const Todo = () => {
  return (
    <div className="pt-7 pb-1 px-3 outline-2 outline-purple-800 w-[300px] my-2 rounded-md" >
      <div className="flex justify-between items-center">

        <div className="flex gap-3">
        <input type="checkbox" name="taskCheck" id="taskCheck" className="accent-purple-500 w-[18px]" />
        <span className="text-purple-600"><h2>Do your task!</h2></span>
        </div>
        <div className='p-1 hover:bg-gray-100 rounded-full'>
          <img src={verticalDots} className='w-[25px]' alt="verticle dots" />
        </div>
      </div>
      <div className='mt-1 flex justify-between'>
        <img src={clock} className='w-[16px] opacity-[0.5] hover:opacity-[1]' alt="clock" />
        <span className='text-sm text-purple-400'>Due Date:</span>
      </div>
    </div>
  )
}

export default Todo