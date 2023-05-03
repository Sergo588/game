import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  check = (params) => requestApi('get', `${this.path}/check`, params);

  login = (address, sign) => requestApi('post', `${this.path}`, { address, sign });
}

export const AuthRepository = new Repository('/auth');
