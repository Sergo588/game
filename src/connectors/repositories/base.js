import { requestApi } from '../api';

export class BaseRepository {
  constructor(path) {
    this.path = path;
  }

  getList = (params) => requestApi('get', this.path, params);

  get = (id) => requestApi('get', `${this.path}/${id}`);

  create = (data) => requestApi('post', this.path, data);

  edit = (id, data) => requestApi('put', `${this.path}/${id}`, data);

  remove = (id) => requestApi('delete', `${this.path}/${id}`);
}
