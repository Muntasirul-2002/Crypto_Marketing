import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency, setCurrency } = useContext(CoinContext);
  const [displayAllCoin, setDisplayAllCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayAllCoin(allCoin);
    }
  };
  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayAllCoin(coins);
  };
  useEffect(() => {
    setDisplayAllCoin(allCoin);
  }, [allCoin]);
  return (
    <div className="home">
      <div className="hero">
        <h1 className="heading">Crypto Online Market</h1>
        <p>
          Welcome to the secure Crypto Online Market. Sign up to explore more
          about cryptos/bitcoin.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            onChange={inputHandler}
            value={input}
            placeholder="Search Crypto"
            required
            list="coinlist"
          />

          <datalist id="coinlist">
{allCoin.map((item,index)=>(<option key={index} value={item.name} />))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayAllCoin.slice(0, 15).map((item, index) => (
          <Link to={`/coin/${item.id}`}  className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>

            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
