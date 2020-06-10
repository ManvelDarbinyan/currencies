import React from "react";
import fetchService from "../../services/FetchService";
import Pagination from "../Pagination/Pagination";
import Table from "./Table";
import Loading from "../Loading/Loading";
import "./List.css";

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      currencies: [],
      error: null,
      page: 1,
      totalPages: 0,
    };
  }

  currenciesGetter = async () => {
    const { page } = this.state;

    const response = await fetchService.get(
      `cryptocurrencies?page=${page}&perPage=7`
    );
    this.setState({
      currencies: response.currencies,
      loading: false,
      totalPages: response.totalPages,
    });
  };

  componentDidMount() {
    this.currenciesGetter();
  }

  handleSort = (direction) => {
    const { currencies } = this.state;

    if (direction === "priceUp") {
      this.setState({
        currencies: currencies.sort(
          (a, b) => b.price.replace(/,/g, "") - a.price.replace(/,/g, "")
        ),
      });
    }

    if (direction === "priceDown") {
      this.setState({
        currencies: currencies.sort(
          (a, b) => a.price.replace(/,/g, "") - b.price.replace(/,/g, "")
        ),
      });
    }

    if (direction === "marketCapUp") {
      this.setState({
        currencies: currencies.sort(
          (a, b) =>
            b.marketCap.replace(/,/g, "") - a.marketCap.replace(/,/g, "")
        ),
      });
    }

    if (direction === "marketCapDown") {
      this.setState({
        currencies: currencies.sort(
          (a, b) =>
            a.marketCap.replace(/,/g, "") - b.marketCap.replace(/,/g, "")
        ),
      });
    }

    if (direction === "change24hUp") {
      this.setState({
        currencies: currencies.sort(
          (a, b) =>
            b.percentChange24h.replace(/,/g, "") -
            a.percentChange24h.replace(/,/g, "")
        ),
      });
    }

    if (direction === "change24hDown") {
      this.setState({
        currencies: currencies.sort(
          (a, b) =>
            a.percentChange24h.replace(/,/g, "") -
            b.percentChange24h.replace(/,/g, "")
        ),
      });
    }
  };

  handlePaginationClick = (direction) => {
    if (direction === "next") {
      this.setState((prev) => ({ page: prev.page + 1 }), this.currenciesGetter);
    } else {
      this.setState((prev) => ({ page: prev.page - 1 }), this.currenciesGetter);
    }
  };

  render() {
    const { loading, currencies, totalPages, page } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }

    return (
      <>
        <Table currencies={currencies} handleSort={this.handleSort} />
        <Pagination
          handlePaginationClick={this.handlePaginationClick}
          totalPages={totalPages}
          page={page}
        />
      </>
    );
  }
}
export default List;
