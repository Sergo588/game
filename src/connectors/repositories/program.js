import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getProgram = (params) => requestApi('get', this.path, params);

  getProgramByName = (program, params) => requestApi('get', `${this.path}/${program}`, params);

  getLevelByName = (program, level, params) => requestApi('get', `${this.path}/${program}/${level}`, params);
}

export const ProgramRepository = new Repository('/program');
