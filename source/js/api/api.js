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
  SERVER_ERROR: 500,
};

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
