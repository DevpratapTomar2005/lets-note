import sortImg from "../assets/icons and logos/sort.svg";

import React from "react";

const Dashboard = () => {
  return (
    <div className="right min-h-screen relative w-full top-[2.74rem] ml-20">
   
      <div className="upcoming-tasks my-7 mx-20">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-roboto text-2xl">Upcoming Tasks</span>
          <span className="hover:bg-gray-100 p-2 rounded-3xl">
            <img className="w-[25px]" src={sortImg} alt="sort" />
          </span>
        </div>
      </div>
      <div className="recent-notes my-7 mx-20">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-roboto text-2xl">Recent Notes</span>
          <span className="hover:bg-gray-100 p-2 rounded-3xl">
            <img className="w-[25px]" src={sortImg} alt="sort" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard