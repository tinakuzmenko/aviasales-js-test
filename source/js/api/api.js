import { Method, ResponseStatus, ServerUrl } from '../utils/constants';

export default class API {
  async getData(searchId) {
    return await this._loadData({
      url: `${ServerUrl.TICKETS}?searchId=${searchId}`,
    });
  }

  async getSearchID() {
    return await this._loadData({
      url: ServerUrl.SEARCH,
    });
  }

  async _loadData({ url, method = Method.GET }) {
    let response = await fetch(url, { method });

    if (
      response.status >= ResponseStatus.OK &&
      response.status < ResponseStatus.REDIRECT
    ) {
      return await response.json();
    }

    if (response.status === ResponseStatus.SERVER_ERROR) {
      return;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  }
}
