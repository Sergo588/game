import { useEffect, useRef, useState } from 'react';
import { useRequest } from 'helpers/hooks/useRequest';
import { UserRepository } from 'connectors/repositories/user';
import _isEmpty from 'lodash/isEmpty';
import _Omit from 'lodash/omit';
import { LOAD_MORE_TYPES } from 'helpers/constants';

export const useGetPartners = (userId = null) => {
  const contrainerRef = useRef(null);
  const [actualData, setActualData] = useState({ partners: [] });
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [updateLoading, setIsUpdateLoading] = useState(false);
  const [isNeedHideButton, setIsNeedHideButton] = useState(false);
  const [isNeedFilteredData, setIsNeedFilteredData] = useState(false);
  const [userIdIsChanged, setUserIdIsChanged] = useState(false);
  const [isRecall, setIsRecall] = useState(false);
  const { isLoading, call, data } = useRequest(UserRepository.getPartners, [userId, { limit: 10, offset: 0 }]);

  const callApi = async (params) => {
    await contrainerRef.current?.scrollTo({
      top: contrainerRef.current?.scrollHeight,
      behavior: 'smooth',
    });

    await call(params);

    const refList = contrainerRef.current?.getElementsByTagName('tr');
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
      callApi([userId, { limit: 10, offset: 0 }]);
    }
  }, [userId]);

  useEffect(() => {
    if (isRecall) {
      setActualData(data);
      setIsRecall(false);
    }

    if (data && data?.partners?.length && !isNeedFilteredData && !userIdIsChanged) {
      setActualData((prevState) => {
        if (prevState?.partners && data?.partners) {
          const resultPartners = [...prevState?.partners, ...data.partners].reduce((result, item, index) => {
            const notRepeatItems = !result.some((resultItem) => resultItem.user.id === item.user.id);

            if (index === 0 || notRepeatItems) {
              return [...result, item];
            }
            return result;
          }, []);

          return {
            ...prevState,
            ...data,
            partners: resultPartners,
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
  }, [data, isNeedFilteredData]);

  const loadData = async (params) => {
    setIsUpdateLoading(true);

    if (params.type === LOAD_MORE_TYPES.RECALL) {
      setIsRecall(true);
      await callApi([userId, { limit: 10, offset: 0 }]);
    }

    if (!_isEmpty(params.filterValues) && params.type === LOAD_MORE_TYPES.FILTER) {
      setIsNeedFilteredData(true);
      await callApi([
        userId,
        {
          ..._Omit(params.filterValues, ''),
        },
      ]);
    }

    if (params.type === LOAD_MORE_TYPES.LOAD_MORE) {
      setIsNeedFilteredData(false);
      await callApi([
        userId,
        {
          offset: actualData.offset ? actualData.offset + 10 : 10,
          limit: 10,
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
  };
};
