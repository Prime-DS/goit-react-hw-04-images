import { useEffect,useCallback } from "react";
import { createPortal } from "react-dom"
import styles from "./modal.module.scss";

const modalRoot = document.getElementById("modal-root");

export default function Modal ({onClose,children}) {

  const closeModal = useCallback(
    ({target, currentTarget, code}) => {
      if (target === currentTarget || code === "Escape") {
        onClose();
      }
    },[onClose]
   )


useEffect(() => {
  window.addEventListener('keydown', closeModal);
  return () => {
    window.removeEventListener('keydown', closeModal);
  };
}, [closeModal])

    return createPortal(
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>
            {/* <span className={styles.close} onClick={closeModal}></span> */}
            {children}
        </div>
      </div>,
      modalRoot
    )
  
}