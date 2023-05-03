import Qs from 'qs';
import config from 'helpers/config';

export const linkWithQuery = (link, query) => {
  return `${link}${Qs.stringify({ user: query.user, ...query }, { addQueryPrefix: true })}`;
};

export const getScanLink = (txHash) => {
  return `${config.scanNetwork}/${txHash}`;
};
