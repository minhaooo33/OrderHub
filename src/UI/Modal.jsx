import {  useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({children, open}) => {
    const dialog = useRef(null);
    useEffect(() => {
        console.log("Modal open status changed: ", open);
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        } else {
            modal.close();
        }
    }, [open]);
return(
    createPortal(
    <dialog
      ref={dialog}
      className="p-6 bg-white rounded-lg w-[90vw] md:w-2/3 h-[80vh] overflow-y-auto mx-auto top-1/2 -translate-y-1/2 absolute inset-0 z-50 backdrop:bg-black/40 transition duration-300 scale-95"
    >
      {children}
    </dialog>
    ,document.getElementById("modal"))
)
} 

export default Modal;