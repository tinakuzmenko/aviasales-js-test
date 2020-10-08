const ServerUrl = {
  SEARCH: 'https://front-test.beta.aviasales.ru/search',
  TICKETS: 'https://front-test.beta.aviasales.ru/tickets',
};

const Method = {
  GET: `GET`,
};

const ResponseStatus = {
  OK: 200,
  REDIRECT: 300,
};

export default class API {
  async getData(searchId) {
    return await this._loadData({
      url: `${ServerUrl.TICKETS}?searchId=${searchId}`,
    }).then(response => response.json());
  }

  async getSearchID() {
    return await this._loadData({
      url: ServerUrl.SEARCH,
    }).then(response => response.json());
  }

  _loadData({ url, method = Method.GET }) {
    return fetch(url, { method })
      .then(this._checkStatus)
      .catch(error => {
        throw error;
      });
  }

  _checkStatus(response) {
    if (
      response.status >= ResponseStatus.OK &&
      response.status < ResponseStatus.REDIRECT
    ) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
