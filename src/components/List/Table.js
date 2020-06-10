import React from "react";
import { withRouter } from "react-router-dom";
import renderChangePercent from "../../helpers/renderChangePercent";
import PropTypes from "prop-types";

const Table = ({ currencies, handleSort, history, ...props }) => {
  return (
    <div className="Table-container">
      <table className="Table">
        <thead className="Table-head">
          <tr>
            <th>CryptoCurrency</th>
            <th>
              Price
              <span className="up" onClick={() => handleSort("priceUp")}>
                &uarr;
              </span>
              <span className="down" onClick={() => handleSort("priceDown")}>
                &darr;
              </span>
            </th>
            <th>
              Market Cap
              <span className="up" onClick={() => handleSort("marketCapUp")}>
                &uarr;
              </span>
              <span
                className="down"
                onClick={() => handleSort("marketCapDown")}
              >
                &darr;
              </span>
            </th>
            <th>
              24H Change
              <span className="up" onClick={() => handleSort("change24hUp")}>
                &uarr;
              </span>
              <span
                className="down"
                onClick={() => handleSort("change24hDown")}
              >
                &darr;
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="Table-body">
          {currencies.map((currency) => (
            <tr
              key={currency.id}
              onClick={() => history.push(`/currency/${currency.id}`)}
            >
              <td>
                <span className="Table-rank">{currency.rank}</span>
                {currency.name}
              </td>
              <td>
                <span className="Table-dollar">$ </span>
                {currency.price}
              </td>
              <td>
                <span className="Table-dollar">$ </span>
                {currency.marketCap}
              </td>
              <td>{renderChangePercent(currency.percentChange24h)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  currencies: PropTypes.array,
  handleSort: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(Table);
