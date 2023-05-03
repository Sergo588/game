import React, { useMemo, useState, useCallback } from 'react';
import { MODAL_STATES } from 'helpers/constants';
import { Modal } from 'components';
import { LoadingProgramStep } from 'features/common/LoadingProgramStep';
import { ErrorProgramStep } from 'features/common/ErrorProgramStep';
import { BuyProgramStep } from './BuyProgramStep';
import { SuccessProgramStep } from './SuccessProgramStep';

export const BuyProgramModal = ({ onClose, name, openedModal, level, withDisableClose = false }) => {
  const [step, setStep] = useState(MODAL_STATES.BASE);
  const [upgradedData, setUpgradedData] = useState({});

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleUpgraded = (data) => {
    setUpgradedData(data);
    handleNextStep();
  };

  const tryAgainHandler = () => {
    setStep(MODAL_STATES.BASE);
  };

  const handleErrorStep = useCallback(() => {
    setStep(3);
  }, []);

  const renderStep = useMemo(() => {
    switch (step) {
      case MODAL_STATES.BASE:
        return <BuyProgramStep name={name} level={level} onNextStep={handleUpgraded} />;
      case MODAL_STATES.LOADING:
        return (
          <LoadingProgramStep
            onNextStep={handleNextStep}
            upgradedData={upgradedData}
            level={level}
            handleErrorStep={handleErrorStep}
          />
        );
      case MODAL_STATES.SUCCESS:
        return <SuccessProgramStep level={level} closeModal={onClose} upgradedData={upgradedData} />;
      case MODAL_STATES.ERROR:
        return <ErrorProgramStep level={level} onTryAgain={tryAgainHandler} upgradedData={upgradedData} />;
      default:
        return null;
    }
  }, [step]);

  return (
    <Modal isOpened={openedModal} onClose={onClose} isDisableOnClose={withDisableClose && step === 1}>
      {renderStep}
    </Modal>
  );
};
