export const debounce = (callackb, delay) => {
  let timeoutId = null;

  return (data) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callackb(data);
      timeoutId = null;
    }, delay);
  };
};
