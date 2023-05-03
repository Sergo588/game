import React, { useMemo, useState, useCallback } from 'react';
import { MODAL_STATES } from 'helpers/constants';
import { Modal } from 'components';
import { LoadingProgramStep } from 'features/common/LoadingProgramStep';
import { ErrorProgramStep } from 'features/common/ErrorProgramStep';
import { FastRegistryStep } from './FastRegistryStep';
import { SuccessFastRegistryStep } from './SuccessFastRegistryStep';

export const FastRegistryModal = ({ openedModal, onClose, uplineId, fromInvite }) => {
  const [step, setStep] = useState(MODAL_STATES.BASE);
  const [upgradedData, setUpgradedData] = useState({});
  const [upgradedLevel, setUpgradedLevel] = useState('');

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleUpgraded = (data, level) => {
    setUpgradedData(data);
    setUpgradedLevel(level);
    handleNextStep();
  };

  const handleErrorStep = useCallback(() => {
    setStep(3);
  }, []);

  const tryAgainHandler = () => {
    setStep(MODAL_STATES.BASE);
  };

  const renderStep = useMemo(() => {
    switch (step) {
      case MODAL_STATES.BASE:
        return <FastRegistryStep fromInvite={fromInvite} uplineId={uplineId} handleNextStep={handleUpgraded} />;
      case MODAL_STATES.LOADING:
        return (
          <LoadingProgramStep
            onNextStep={handleNextStep}
            upgradedData={upgradedData}
            handleErrorStep={handleErrorStep}
            level={upgradedLevel}
          />
        );
      case MODAL_STATES.SUCCESS:
        return <SuccessFastRegistryStep closeModal={onClose} />;
      case MODAL_STATES.ERROR:
        return <ErrorProgramStep onTryAgain={tryAgainHandler} level={upgradedLevel} upgradedData={upgradedData} />;
      default:
        return null;
    }
  }, [step]);

  return (
    <Modal isOpened={openedModal} onClose={onClose} isDisableOnClose={step >= 1}>
      {renderStep}
    </Modal>
  );
};
