import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";
import { useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import AddTask from "./AddTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [trashTask] = useTrashTaskMutation();
  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };
  const editTaskHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  }
  const deleteHandler = async () => {
    try {
      const result = await trashTask({
        id: selected,
        isTrash: "trash"
      }).unwrap();
      toast.success(result?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-white  text-left'>
        <th className='py-2'>Название задачи</th>
        <th className='py-2'>Приоритет</th>
        <th className='py-2 line-clamp-1'>Создан</th>
        <th className='py-2'>Ресурсы</th>
        <th className='py-2'>Команда</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-200 text-white hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-[#FFA500]'>
            {task?.title}
          </p>
        </div>
      </td>

      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize line-clamp-1'>
            {task?.priority} Приоритет
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='text-sm text-white'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1 items-center text-sm text-white'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-white dark:text-gray-400'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-white dark:text-gray-400'>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className='py-2 flex gap-2 md:gap-4 justify-end'>
        <Button
          className='text-[#FFA500] hover:text-white sm:px-2 text-sm md:text-base'
          label='Редактировать'
          type='button'
          onClick={()=> editTaskHandler(task)}
        />

        <Button
          className='text-red-400 hover:text-red-100 sm:px-2 text-sm md:text-base'
          label='Удалить'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );
  return (
    <>
      <div className='bg-[#212121]  px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;
