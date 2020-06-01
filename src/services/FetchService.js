class FetchService {
  static instance = null;
  #DOMAIN = "https://api.udilia.com/coins/v1";

  constructor() {
    if (FetchService.instance) {
      return FetchService.instance;
    }
    FetchService.instance = this;
  }

  async get(url) {
    const path = `${this.#DOMAIN}/${url}`;
    const response = await (await fetch(path)).json();
    return response;
  }

  post() {}

  put() {}

  delete() {}
}

const fetchService = new FetchService();

export default fetchService;
