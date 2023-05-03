import { useGetContract } from 'helpers/hooks/useGetContract';
import { CONTRACT_NAMES } from 'helpers/constants';
// import { useEffect } from 'react';

export const useXBaseContract = () => {
  const { getContract } = useGetContract();

  const getAddressByValue = async (value) => {
    const contract = await getContract(CONTRACT_NAMES.XBASE);

    const currentValue = String(value);
    let address = '';
    if (currentValue?.match(/^[0-9]+$/)) {
      const result = await contract.userIds(currentValue);

      address = (await contract.isUserExists(result)) ? result : '';
    }

    return address;
  };
  //
  // useEffect(async () => {
  //   const contract = await getContract(CONTRACT_NAMES.XBASE);
  //   ['0x0c79F7CF242D4E8859d59b869878c27c14853B1A'].forEach(async (value) => {
  //     const { referrer, id } = await contract.users(value);
  //     const { id: refererId } = await contract.users(referrer);
  //
  //     console.log(value, parseInt(id), parseInt(refererId));
  //   });
  // }, []);

  return {
    getAddressByValue,
  };
};
