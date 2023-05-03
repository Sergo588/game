import React, { useState } from 'react';
import { useGameContract } from 'helpers/hooks/useGameContract';
import { Button, Input } from 'components';

export const BuyLevelForm = () => {
  const [address, setAddress] = useState('');
  const [level, setLevel] = useState('');
  const { buyLevelForAddress } = useGameContract();

  const onBuyLevelFor = () => {
    try {
      buyLevelForAddress(address, level);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Input placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Input placeholder="level" className="mt-2.5" value={level} onChange={(e) => setLevel(e.target.value)} />
      <Button type="gradient-orange-yellow" className="mt-7.5" onClick={onBuyLevelFor}>
        Buy
      </Button>
    </div>
  );
};
