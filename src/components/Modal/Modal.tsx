import { ModalProps } from "@/common/types/modal";
import React, { useEffect } from "react";
import styles from "./Modal.module.scss"
import { FiX } from "react-icons/fi";



export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
        };
        if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
        document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay}  onClick={onClose}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modal_close_button}  onClick={onClose}>
                    <FiX size={24} />
                </button>
            {children}
        </div>
        </div>
    );
    };

