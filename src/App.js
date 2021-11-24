import { placeholder } from '@babel/types';
import { optionalCallExpression } from '@babel/types';
import { useEffect, useState } from 'react';

const Loading = () => {
  useEffect(() => {
    return () => console.log(`Load Complete`);
  }, []);
  return (
    <p style={{ textAlign: 'center', color: 'red', fontWeight: '800' }}>
      Loading, please wait
    </p>
  );
};

function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch(`https://api.coinpaprika.com/v1/tickers`)
      .then((datas) => {
        return datas.json();
      })
      .then((datas) => {
        setCoins(datas);
        setIsLoading(false);
        setSecondValue([datas[0].symbol, datas[0].beta_value]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hadleInput = (e) => {
    setFirstValue(e.target.value);
    setResult(Number(firstValue) * Number(secondValue[1]));
  };
  const handleSelect = (e) => {
    const coinValue = e.target.value.split(',');
    setSecondValue(coinValue);
    setResult(Number(firstValue) * Number(secondValue[1]));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', borderBottom: '1px solid black' }}>
        Coin Converter
      </h1>
      {isLoading ? <Loading /> : null}
      <input
        type="number"
        placeholder="($)"
        value={firstValue}
        onChange={hadleInput}
      />
      <select name="" id="" onChange={handleSelect}>
        {coins.map((coin, index) => {
          return (
            <option key={index} value={[coin.symbol, coin.beta_value]}>
              {coin.name} {coin.symbol}
            </option>
          );
        })}
      </select>
      <p>
        {firstValue}$ → {result} {secondValue[0]}
      </p>
    </div>
  );
}

export default App;
