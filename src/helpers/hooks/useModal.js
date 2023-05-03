import { useCallback, useState } from 'react';

export const useModal = () => {
  const [openedModal, setOpenedModal] = useState(false);

  const onOpen = useCallback(() => {
    setOpenedModal(true);
  }, []);

  const onClose = useCallback(() => {
    setOpenedModal(false);
  }, []);

  return {
    openedModal,
    onOpen,
    onClose,
  };
};
