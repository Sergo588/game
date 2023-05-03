import React, { useMemo, useState, useCallback } from 'react';
import { MODAL_STATES } from 'helpers/constants';
import { Modal } from 'components';
import { LoadingProgramStep } from 'features/common/LoadingProgramStep';
import { ErrorProgramStep } from 'features/common/ErrorProgramStep';
import { BaseRegistryStep } from './BaseRegistryStep';
import { SuccessBaseRegistryStep } from './SuccessBaseRegistryStep';

export const BaseRegistryModal = ({ openedModal, onClose, isRegistered }) => {
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
        return (
          <BaseRegistryStep handleNextStep={handleUpgraded} selectedLevel={upgradedLevel} isRegistered={isRegistered} />
        );
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
        return <SuccessBaseRegistryStep closeModal={onClose} upgradedLevel={upgradedLevel} />;
      case MODAL_STATES.ERROR:
        return <ErrorProgramStep level={upgradedLevel} onTryAgain={tryAgainHandler} upgradedData={upgradedData} />;
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
