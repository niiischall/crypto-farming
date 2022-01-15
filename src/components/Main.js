import React, { useState } from "react";
import dai from "../dai.png";

const Main = (props) => {
  const {
    daiTokenBalance,
    dappTokenBalance,
    stakingBalance,
    stakeTokens,
    unstakeTokens,
  } = props;
  const [inputValue, setInputValue] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let amount = inputValue.toString();
    amount = window.web3.utils.toWei(amount, "Ether");
    stakeTokens(amount);
  };

  const handleUnstaking = (event) => {
    event.preventDefault();
    unstakeTokens();
  };

  return (
    <div id="content" className="mt-3">
      <table className="table table-borderless text-muted text-center">
        <thead>
          <tr>
            <th scope="col">Deposit Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <td>{window.web3.utils.fromWei(stakingBalance, "Ether")} DAI</td>
          <td>{window.web3.utils.fromWei(dappTokenBalance, "Ether")} DAPP</td>
        </tbody>
      </table>
      <div className="card mb-4">
        <div className="card-body">
          <form className="mb-3" onSubmit={handleSubmit}>
            <div>
              <span className="float-right text-muted">
                Balance: {window.web3.utils.fromWei(daiTokenBalance, "Ether")}
              </span>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter number of coins"
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={dai} height="32" alt="" />
                  &nbsp;&nbsp; DAI
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success btn-block btn-lg">
              DEPOSIT COINS
            </button>
          </form>
          <button
            type="submit"
            className="btn btn-danger btn-block btn-lg"
            onClick={handleUnstaking}
          >
            WITHDRAW COINS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
