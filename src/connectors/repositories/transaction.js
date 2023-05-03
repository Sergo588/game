import { BaseRepository } from './base';
import { requestApi } from '../api';

class Repository extends BaseRepository {
  getTransactions = (params) => requestApi('get', `${this.path}`, params);
}

export const TransactionsRepository = new Repository('/transaction');
