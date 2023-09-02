'use client'

import { useCallback, useEffect } from "react";

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

// I was unable to get this working as a server component; I got errors about being unable to destruction "children" from the props.

type ClientModalProps = {
  handleClose?: () => void;
  children: any;
}

function useEscapeKey(handleClose?: () => void) {
  // Pulled from https://keyholesoftware.com/2022/07/13/cancel-a-react-modal-with-escape-key-or-external-click/
  const handleEscKey = useCallback((event: globalThis.KeyboardEvent) => {
    if (event.key === KEY_NAME_ESC) {
      handleClose && handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}

export default function ClientModal({ handleClose, children }: ClientModalProps) {
  useEscapeKey(handleClose);
  return (
    <div className="fixed z-10 inset-0 min-h-screen min-w-full p-12 lg:p-24 lg:px-32 bg-gray-800 bg-opacity-60">
      <div className="max-w-2xl mx-auto p-8 lg:p-18 border border-gray-900 bg-white dark:bg-gray-900 rounded-md lg:rounded-lg w-auto">
        <div className="h-8 lg:h-12">
          <button className="float-left border border-gray-300 rounded-md w-8 h-8 lg:h-11 lg:w-11" onClick={handleClose}>
            <i className="fa-solid fa-xmark text-gray-900 text-base lg:text-2xl p-2" />
          </button>
        </div>
        { children }
      </div>
    </div>
  )
}