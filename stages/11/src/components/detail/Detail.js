import React from 'react';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import { handleResponse, renderChangePercent } from '../../helpers';
import './Detail.css';

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: {},
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const currencyId = this.props.match.params.id;

    this.setState({ loading: true });

    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then((currency) => {
        this.setState({
          loading: false,
          currency
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.errorMessage,
        });
      });
  }

  render() {
    const { loading, error, currency } = this.state;

    // Render only loading component if loading state is set to true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    // Render only error message, if error occurred while fetching data
    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>

        <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">$ {currency.price}</span>
          </div>
          <div className="Detail-item">
            Rank <span className="Detail-value">{currency.rank}</span>
          </div>
          <div className="Detail-item">
            24H Change
            <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total supply</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;



function job(state) {
  return new Promise(function(resolve, reject) {
    if (state) {
      resolve('success');
    } else {
      reject('error');
    }
  });
}

let promise = job(true);
promise
    .then(function(data) {
      console.log(data);
      return job(true);
    })
    .then(function(data) {
      if (data !== 'victory') {
        throw 'Defeat';
      }
      return job(true);
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.log(error);
      return job(false);
    })
    .then(function(data) {
      console.log(data);
      return job(true);
    })
    .catch(function(error) {
      console.log(error);
      return 'Error caught';
    })
    .then(function(data) {
      console.log(data);
      return new Error('test');
    })
    .then(function(data) {
      console.log('Success:', data.message);
    })
    .catch(function(data) {
      console.log('Error:', data.message);
    });

//success
//Defeat
//error
//Error caught
//Error : test




















