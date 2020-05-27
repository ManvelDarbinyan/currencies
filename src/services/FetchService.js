class FetchService {
  static instance = null;

  constructor() {
    if (FetchService.instance) {
      return FetchService.instance;
    }
    FetchService.instance = this;
  }

  get() {}

  post() {}

  push() {}

  delete() {}
}

const fetchService = new FetchService();

export default FetchService;
