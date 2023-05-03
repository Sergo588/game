import { useEffect, useRef, useState } from 'react';
import { useRequest } from 'helpers/hooks/useRequest';
import { TransactionsRepository } from 'connectors/repositories/transaction';
import _isEmpty from 'lodash/isEmpty';
import _PickBy from 'lodash/pickBy';
import { LOAD_MORE_TYPES } from 'helpers/constants';

export const useTransactions = ({ userId = null, program = null, level = null, sort = 'desc' }) => {
  const contrainerRef = useRef(null);
  const [actualData, setActualData] = useState({ transactions: [] });
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [updateLoading, setIsUpdateLoading] = useState(false);
  const [isNeedHideButton, setIsNeedHideButton] = useState(false);
  const [isNeedFilteredData, setIsNeedFilteredData] = useState(false);
  const [userIdIsChanged, setUserIdIsChanged] = useState(false);
  const [isRecall, setIsRecall] = useState(false);

  useEffect(() => {
    setActualData({ transactions: [] });
  }, [userId, program, level]);

  const { isLoading, call, data, resetData } = useRequest(TransactionsRepository.getTransactions, [
    { limit: 10, offset: 0, user_id: userId, program, level, sort },
  ]);

  const callApi = async (params) => {
    await contrainerRef.current?.scrollTo({
      top: contrainerRef.current?.scrollHeight,
      behavior: 'smooth',
    });

    await call(params);

    const isTable = !!contrainerRef.current?.getElementsByTagName('table').length;
    const refList = isTable ? contrainerRef.current?.getElementsByTagName('tr') : contrainerRef.current?.childNodes;
    const lastItems = refList?.length - 1 || 0;

    setTimeout(() => {
      const childHeight = refList?.[lastItems + 2]?.getBoundingClientRect?.()?.height || 0;

      contrainerRef.current?.scrollTo({
        top: contrainerRef.current?.scrollTop + (childHeight + 5) * 2,
        behavior: 'smooth',
      });
    }, 0);
  };

  useEffect(() => {
    if (isFirstLoading) {
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, isLoading]);

  useEffect(() => {
    if (!isFirstLoading) {
      setUserIdIsChanged(true);
      callApi([{ user_id: userId, limit: 10, offset: 0 }]);
    }
  }, [userId]);

  useEffect(() => {
    if (isRecall) {
      setActualData(data);
      setIsRecall(false);
    }

    if (data && data?.transactions?.length) {
      setActualData((prevState) => {
        if (prevState?.transactions && data?.transactions) {
          const resultTransactions = [...prevState?.transactions, ...data.transactions].reduce(
            (result, item, index) => {
              const notRepeatItems = !result.some((resultItem) => resultItem.id === item.id);

              if (index === 0 || notRepeatItems) {
                return [...result, item];
              }
              return result;
            },
            [],
          );

          return {
            ...prevState,
            ...data,
            transactions: resultTransactions,
          };
        }
      });
    }

    if (!data?.there_is_more) {
      setIsNeedHideButton(true);
    }

    if (data?.there_is_more) {
      setIsNeedHideButton(false);
    }

    if (userIdIsChanged) {
      setUserIdIsChanged(false);
      setActualData(data);
    }

    if (isNeedFilteredData) {
      setActualData(data);
    }
  }, [data]);

  const loadData = async (params) => {
    setIsUpdateLoading(true);

    if (params.type === LOAD_MORE_TYPES.RECALL) {
      setIsRecall(true);
      await callApi([{ limit: 10, offset: 0, user_id: userId, program, level, sort }]);
    }

    if (!_isEmpty(params.filterValues) && params.type === LOAD_MORE_TYPES.FILTER) {
      setIsNeedFilteredData(true);
      await callApi([
        {
          from_id: actualData.from_id,
          ..._PickBy(params.filterValues, (value) => value.length > 0 || typeof value === 'number'),
        },
      ]);
    }

    if (params.type === LOAD_MORE_TYPES.LOAD_MORE) {
      setIsNeedFilteredData(false);
      await callApi([
        {
          from_id: actualData.from_id,
          offset: actualData.offset ? actualData.offset + 10 : 10,
          limit: 10,
          user_id: userId,
          program,
          level,
          sort,
        },
      ]);
    }

    setIsUpdateLoading(false);
  };

  const isAllLoading = updateLoading || isLoading;

  return {
    isLoading: isAllLoading,
    actualData,
    loadData,
    call: callApi,
    contrainerRef,
    isNeedHideButton,
    setIsNeedHideButton,
    resetData,
  };
};
