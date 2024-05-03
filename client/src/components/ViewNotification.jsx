import React from 'react'
import ModalWrapper from './ModalWrapper';
import { Dialog } from '@headlessui/react';
import Button from './Button';
const ViewNotification = ({open, setOpen, el}) => {
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
            <Dialog.Title as='h3' className="font-semibold text-lg">
                {el?.task?.title}
            </Dialog.Title>
            <p className='text-start text-white'>{el?.text}</p>

            <Button
            type="button"
            className="bg-[#181818] px-8 mt-3 text-sm font-semibold text-white sm:w-auto border "
            onClick={() => setOpen(false)}
            label="Ok"
            />
        </div>
    </ModalWrapper>
  )
}

export default ViewNotification