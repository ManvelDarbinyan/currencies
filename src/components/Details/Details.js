import React from "react";
import "./Details.css";
import fetchService from "../../services/FetchService";
import Loading from "../Loading/Loading";
import renderChangePercent from "../../helpers/renderChangePercent";
import { useEffect, useReducer, useCallback } from "react";

// class Details extends React.PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       loading: true,
//       currency: {},
//     };
//   }

//   getCurrency = async () => {
//     const currencyId = this.props.match.params.id;
//     const response = await fetchService.get(`cryptocurrencies/${currencyId}`);
//     this.setState({
//       currency: response,
//       loading: false,
//     });
//   };

//   componentDidUpdate(prevProps) {
//     if (prevProps.match.params.id !== this.props.match.params.id) {
//       this.getCurrency();
//     }
//   }

//   componentDidMount() {
//     this.getCurrency();
//   }

//   render() {
//     const { loading, currency } = this.state;

//     if (loading) {
//       return (
//         <div className="loading-container">
//           <Loading />
//         </div>
//       );
//     }
//     return (
//       <div className="Detail">
//         <h1 className="Detail-heading">
//           {currency.name} ({currency.symbol})
//         </h1>
//         <div className="Detail-container">
//           <div className="Detail-item">
//             Price <span className="Detail-value">$ {currency.price}</span>
//           </div>
//           <div className="Detail-item">
//             Rank <span className="Detail-value">{currency.rank}</span>
//           </div>
//           <div className="Detail-item">
//             24H Change
//             <span className="Detail-value">
//               {renderChangePercent(currency.percentChange24h)}
//             </span>
//           </div>
//           <div className="Detail-item">
//             <span className="Detail-title">Market cap</span>
//             <span className="Detail-dollar">$</span>
//             {currency.marketCap}
//           </div>
//           <div className="Detail-item">
//             <span className="Detail-title">24H Volume</span>
//             <span className="Detail-dollar">$</span>
//             {currency.volume24h}
//           </div>
//           <div className="Detail-item">
//             <span className="Detail-title">Total supply</span>
//             {currency.totalSupply}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

const detailReducer = function (state, action) {
  switch (action.type) {
    case "GET_CRYPTOCURRENCY_DONE":
      return {
        loading: false,
        currency: action.payload,
      };
  }
};

const Details = ({ match }) => {
  const [{ currency, loading }, dispatch] = useReducer(detailReducer, {
    loading: true,
    currency: {},
  });

  const getCurrency = useCallback(async () => {
    const currencyId = match.params.id;
    const response = await fetchService.get(`cryptocurrencies/${currencyId}`);
    dispatch({
      type: "GET_CRYPTOCURRENCY_DONE",
      payload: response,
    });
  }, [match.params.id]);

  useEffect(() => {
    getCurrency();
  }, [match.params.id]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
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
          <span className="Detail-value">
            {renderChangePercent(currency.percentChange24h)}
          </span>
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
};

export default Details;
