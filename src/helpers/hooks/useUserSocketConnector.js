import { useGetWebSocketProvider } from 'helpers/hooks/useGetWebSocketProvider';
import { useCallback, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import config from 'helpers/config';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { compareAddresses } from 'helpers/wallet';
import { addNotification } from 'store/userSlice';
import { CONTRACT_NAMES, NOTIFICATIONS_TYPES } from 'helpers/constants';
import { formatEther } from 'ethers/lib/utils';
import { userAddressToId } from 'helpers/checks';
import { useGetContract } from 'helpers/hooks/useGetContract';

export const useUserSocketConnector = () => {
  const { account } = useWeb3React();
  const authUser = useSelector(getAuthUser);
  const { getContract } = useGetContract();
  const socketProvider = useGetWebSocketProvider();
  const dispatch = useDispatch();

  const onUpgrade = useCallback((...props) => {
    const [user, cloneId, level, transaction] = props;

    dispatch(
      addNotification({
        type: NOTIFICATIONS_TYPES.UPGRADE,
        isNew: true,
        user,
        cloneId: formatEther(cloneId),
        level,
        tx: transaction.transactionHash,
      }),
    );
  }, []);

  const onReferalBonus = useCallback(
    async (...props) => {
      const [from, receiverId, receiverAddress, level, value, isGift, transaction] = props;

      if (isGift) {
        const contract = await getContract(CONTRACT_NAMES.XBASE);
        const userId = parseInt(await userAddressToId(account, contract));

        dispatch(
          addNotification({
            type: NOTIFICATIONS_TYPES.GIFT_PARTNER_BONUS,
            isNew: true,
            interacting_user_address: from,
            interacting_user_id: userId,
            receiverId: formatEther(receiverId),
            receiverAddress,
            level,
            amount: formatEther(value),
            isGift,
            tx: transaction.transactionHash,
          }),
        );
      } else {
        dispatch(
          addNotification({
            type: NOTIFICATIONS_TYPES.PARTNER_BONUS,
            isNew: true,
            interacting_user_address: from,
            target_user_id: formatEther(receiverId),
            receiverAddress,
            level,
            amount: formatEther(value),
            isGift,
            tx: transaction.transactionHash,
          }),
        );
      }
    },
    [account],
  );

  const onNewPartner = useCallback((...props) => {
    const [user, referrer, transaction] = props;

    dispatch(
      addNotification({
        type: NOTIFICATIONS_TYPES.NEW_PARTNER,
        isNew: true,
        user,
        referrer,
        tx: transaction.transactionHash,
      }),
    );
  }, []);

  const onRewardSent = useCallback((...props) => {
    const [from, receiverId, receiverAddress, , level, value, transaction] = props;

    dispatch(
      addNotification({
        type: NOTIFICATIONS_TYPES.PROFIT,
        isNew: true,
        from,
        receiverId: formatEther(receiverId),
        receiverAddress,
        internalReceiverId: formatEther(receiverId),
        level,
        amount: formatEther(value),
        tx: transaction.transactionHash,
      }),
    );
  }, []);

  const onMissedEth = useCallback((...props) => {
    const [receiver, from, level, isFreeze, amount, transaction] = props;

    if (isFreeze) {
      dispatch(
        addNotification({
          type: NOTIFICATIONS_TYPES.PROFIT_MISSED,
          isNew: true,
          receiver,
          from,
          level,
          isFreeze,
          amount: formatEther(amount),
          tx: transaction.transactionHash,
        }),
      );
    } else {
      dispatch(
        addNotification({
          type: NOTIFICATIONS_TYPES.PARTNER_BONUS_MISSED,
          isNew: true,
          receiver,
          from,
          level,
          isFreeze,
          amount: formatEther(amount),
          tx: transaction.transactionHash,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (socketProvider) {
      const contractGameSocket = new Contract(config.contractGame, config.gameAbi, socketProvider);

      const newPartner = contractGameSocket.filters.Registration(null, account);
      const rewardSent = contractGameSocket.filters.RewardSent(null, null, account);
      const upgrade = contractGameSocket.filters.Upgrade(account);
      const referalBonus = contractGameSocket.filters.ReferalBonus(null, null, account);
      const missedEth = contractGameSocket.filters.MissedEthReceive(account);

      if (account && compareAddresses(account, authUser?.address)) {
        contractGameSocket?.on(newPartner, onNewPartner);
        contractGameSocket?.on(rewardSent, onRewardSent);
        contractGameSocket?.on(upgrade, onUpgrade);
        contractGameSocket?.on(referalBonus, onReferalBonus);
        contractGameSocket?.on(missedEth, onMissedEth);
      }

      return () => {
        contractGameSocket?.off(newPartner, onNewPartner);
        contractGameSocket?.off(rewardSent, onRewardSent);
        contractGameSocket?.off(upgrade, onUpgrade);
        contractGameSocket?.off(referalBonus, onReferalBonus);
        contractGameSocket?.off(missedEth, onMissedEth);
      };
    }
  }, [socketProvider, account, authUser?.id]);
};
