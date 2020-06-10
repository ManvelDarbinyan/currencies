import React from "react";
import fetchService from "../../services/FetchService";
import Loading from "../Loading/Loading";
import { withRouter } from "react-router-dom";
import "./Search.css";
import { debounce } from "../../helpers/debounce";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      searchResults: [],
      loading: false,
    };
  }

  handleChange = async (e) => {
    const { value } = e.target;
    this.setState({ searchQuery: value });

    if (!value) return null;

    this.setState({ loading: true });
    this.fetchData(value);
  };

  fetchCurrencies = async (value) => {
    const response = await fetchService.get(
      `autocomplete?searchQuery=${value}`
    );

    this.setState({
      searchResults: response,
      loading: false,
    });
  };

  componentDidMount() {
    this.fetchData = debounce((value) => this.fetchCurrencies(value), 1000);
  }

  renderChangeResults = () => {
    const { loading, searchQuery, searchResults } = this.state;

    if (!searchQuery) {
      return "";
    }

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="Search-result"
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }

    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">No results found.</div>
        </div>
      );
    }
  };

  handleRedirect = (currencyId) => {
    this.setState({
      searchQuery: "",
      searchResults: [],
    });
    this.props.history.push(`/currency/${currencyId}`);
  };

  render() {
    const { searchQuery, loading } = this.state;

    return (
      <div className="Search">
        <span className="Search-icon" />
        <input
          className="Search-input"
          type="text"
          value={searchQuery}
          placeholder="Currency name"
          onChange={this.handleChange}
        />
        {loading && (
          <div className="Search-loading">
            <Loading height="12px" width="12px" />
          </div>
        )}
        {this.renderChangeResults()}
      </div>
    );
  }
}

export default withRouter(Search);
