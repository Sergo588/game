import { utils } from 'ethers';

export const increaseByPercent = (number, percent = 70) => {
  const onePercent = number.div(100);

  return number.add(onePercent.mul(percent));
};

export function toWei(value, uintName = 'gwei') {
  return utils.parseUnits(String(value), uintName);
}
