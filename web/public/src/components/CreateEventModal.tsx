import React, { useEffect, useState } from 'react';

import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useEventStore } from '../store';
import CreateEventForm from './CreateEventForm';

const CreateEventModal = () => {
  const open = useEventStore((state) => state.createEventModalOpenState);
  const toggle = useEventStore((state) => state.toggleCreateEvenModal);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-800"
        initialFocus={cancelButtonRef}
        onClose={() => toggle(false)}
        as="div"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-20" />
        </Transition.Child>
        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex  min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as="div"
              className="flex w-full justify-center"
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all my-4 p-6 max-w-5/6">
                <CreateEventForm />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default CreateEventModal;
