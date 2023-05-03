import { utils } from 'ethers';

export function toChecksumAddress(value) {
  try {
    return utils.getAddress(value);
  } catch {
    return '';
  }
}

export function compareAddresses(firstAddr, secondAddr) {
  try {
    return toChecksumAddress(firstAddr) === toChecksumAddress(secondAddr);
  } catch (e) {
    return false;
  }
}
