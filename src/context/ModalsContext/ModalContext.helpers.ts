export const KEY_FIRST_TIME = "firstTime";

export const shouldShowHowToPlayModal = () => {
  const isFirstTime = localStorage.getItem(KEY_FIRST_TIME);
  return isFirstTime === null;
};
