import React from 'react';


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
    this.setState({ loading: true });

    fetch('https://api.udilia.com/coins/v1/cryptocurrencies?page=1000&perPage=20')
      .then(response=>{

        console.log(response.json())
        return response.json().then(data =>{
          return response.ok ? data : Promise.reject(data)
        })
      })
      .then((data) => {
        this.setState({
          currencies: data.currencies,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  render() {
    console.log(this.state);

    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>text</div>
      
    );
  }
}

export default List;
