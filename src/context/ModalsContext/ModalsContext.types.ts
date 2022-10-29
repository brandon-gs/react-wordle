export interface ModalsContextState {
  modals: AvailableModals;
  openModalByKey: (key: keyof AvailableModals) => void;
  closeModalByKey: (key: keyof AvailableModals) => void;
}

export interface AvailableModals {
  showHowToPlay: boolean;
  showStats: boolean;
}
