import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
  MdOutlineInventory ,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  {
    label: "Панель управления",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Задачи",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Выполнено",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "В процессе",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Сделать",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Команда",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Удаленные",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-4 px-3 py-2 rounded-full items-center  text-white text-base hover:bg-[#FFA900] hover:text-white",
          path === el.link.split("/")[0] ? "bg-[#FFA500] text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className=''>{el.label}</span>
      </Link>
    );
  };
  return (
    <div className='w-full  h-full flex flex-col gap-2 p-2 '>
      <h1 className='flex gap-1 items-center bg-[#212121] justify-center py-3 rounded-lg '>
        <p className='bg-[#FFA500] p-2 rounded-full'>
          <MdOutlineInventory className='text-white text-2xl font-black' />
        </p>
        <span className='text-2xl font-bold text-white'>TaskM</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8 bg-[#212121] items-center rounded-lg'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      {/* <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
