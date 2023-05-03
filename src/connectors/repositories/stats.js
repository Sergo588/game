import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getTotalStatistics = () => requestApi('get', `${this.path}/program`);
}

export const StatsRepository = new Repository('/stats');
