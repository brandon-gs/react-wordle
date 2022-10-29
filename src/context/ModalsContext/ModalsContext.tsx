import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { KEY_FIRST_TIME, shouldShowHowToPlayModal } from "./ModalContext.helpers";
import type { AvailableModals, ModalsContextState } from "./ModalsContext.types";

export const ModalsContext = createContext<ModalsContextState>({
  modals: { showHowToPlay: false, showStats: false },
  openModalByKey: () => null,
  closeModalByKey: () => null,
});

export const ModalsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<AvailableModals>({
    showHowToPlay: shouldShowHowToPlayModal(),
    showStats: false,
  });

  const openModalByKey = useCallback((key: keyof AvailableModals) => {
    setModals((prev) => ({ ...prev, [key]: true }));
  }, []);

  const closeModalByKey = useCallback((key: keyof AvailableModals) => {
    setModals((prev) => ({ ...prev, [key]: false }));
  }, []);

  // save the first time the user open the app
  useEffect(() => {
    localStorage.setItem(KEY_FIRST_TIME, "true");
  }, []);

  return (
    <ModalsContext.Provider value={{ modals, openModalByKey, closeModalByKey }}>{children}</ModalsContext.Provider>
  );
};
