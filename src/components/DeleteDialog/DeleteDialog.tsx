import React, { MouseEvent } from 'react';
import { Dialog } from '@headlessui/react';
import SimpleButton from '../SimpleButton/SimpleButton';
import CustomButton from '../CustomButton/CustomButton';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface DeleteDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  action?: () => void;
  loading: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  closeDialog,
  action,
  loading,
}) => {
  return (
    <>
      <Dialog open={isOpen} onClose={closeDialog}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <Dialog.Panel className="h-96 w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="flex justify-center mb-4 text-center font-medium leading-6 ">
                <XCircleIcon className="h-28 stroke-red-500" />
              </Dialog.Title>
              <Dialog.Description className="flex flex-col text-3xl text-center text-dark-grey">
                Are you sure?
              </Dialog.Description>
              <div className="my-4">
                <p className="text-base text-gray-500 px-10 text-center">
                  Do you really want to delete this league? This process cannot
                  be undone.
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <SimpleButton
                  content="Cancel"
                  styling="w-24 bg-stroke text-dark-grey"
                  onClick={closeDialog}
                />
                <CustomButton
                  loading={loading}
                  children="Delete"
                  type="button"
                  styling="w-24 bg-red-500 text-white hover:contrast-75 transition-all ml-2"
                  action={action}
                />
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
