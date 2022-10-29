import { FC, PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, className = "", onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-light bg-opacity-40 transition-opacity dark:bg-dark dark:bg-opacity-40" />
      <div
        role="button"
        aria-label="backdrop"
        className="pt-7 pb-10 fixed inset-0 z-10 overflow-y-auto"
        onClick={() => {
          onClose();
        }}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="w-modal relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all border bg-lightModal dark:bg-darkModal border-lightBorder dark:border-darkBorder cursor-auto">
            <div
              className={`${className} pl-11 pr-3 pt-14 pb-7 flex flex-col bg-lightModal dark:bg-darkModal text-lightText dark:text-darkText text-lg cursor-auto`}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
