import React from "react";
import FetchService from "../../services/FetchService";

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
    };
  }

  componentDidMount() {
    <FetchService />;
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }
    return <div>text</div>;
  }
}
export default List;
