export const shortenAddress = (address, chars = 4) => {
  try {
    return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
  } catch (error) {
    return '';
  }
};

export const splitNumber = (str) => {
  try {
    if (!str?.toString()) {
      return str;
    }

    const [roundNum, decNum] = str?.toString()?.split('.');

    return `${roundNum?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009')}${decNum ? `.${decNum}` : ''}`;
  } catch (e) {
    return str;
  }
};

export const customToFixed = (num, decimals = 3) => {
  return num.toFixed(decimals).replace(/0*$/, '');
};
