import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getNonce = (address) => requestApi('get', `${this.path}/${address}/nonce`);

  getCurrent = () => requestApi('get', `${this.path}/current`);

  getAccount = (address) => requestApi('get', `${this.path}/${address}`);

  getPartners = (id, params) => requestApi('get', `${this.path}/${id}/partner`, params);
}

export const UserRepository = new Repository('/user');
