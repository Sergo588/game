import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getRefInfo = (refkey) => requestApi('get', `${this.path}/${refkey}`);
}

export const RefUplineRepository = new Repository('/ref');
