import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-[#212121] px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-gray-500 block md:hidden'
        >
          ☰
        </button>

        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#181818]'>
          <MdOutlineSearch className='text-white text-xl' />

          <input
            type='text'
            placeholder='Найти....'
            className='flex-1 outline-none bg-transparent placeholder:text-white text-white'
          />
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
