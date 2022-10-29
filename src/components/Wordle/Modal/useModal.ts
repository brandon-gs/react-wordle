import { useEffect } from "react";

const useModal = (isOpened: boolean, callbackClose: () => void) => {
  useEffect(() => {
    const keyboardCloseModal = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        callbackClose();
      }
    };

    if (!isOpened) {
      return () => {
        window.removeEventListener("keydown", keyboardCloseModal);
      };
    }

    window.addEventListener("keydown", keyboardCloseModal);
    return () => {
      window.removeEventListener("keydown", keyboardCloseModal);
    };
  }, [isOpened, callbackClose]);
};

export default useModal;
