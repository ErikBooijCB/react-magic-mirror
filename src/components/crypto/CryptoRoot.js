import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/crypto';
import PortfolioItem from './PortfolioItem';
import TimerLoader from './TimerLoader';

const TimerEnd = new Date;
TimerEnd.setTime(Date.now() + 3 * 1000);

const CryptoRoot = ({ fetchInterval, isFetching, onTimerEnd, portfolio = [], nextFetch }) => (
  <div>
    <TimerLoader isLoading={ isFetching } totalTime={ fetchInterval } timerEnd={ nextFetch } onTimerEnd={ onTimerEnd }/>
    {portfolio.map(portfolioItem => (
      <PortfolioItem
        key={ `${portfolioItem.symbol}.${portfolioItem.investment}` }
        fetching={ isFetching }
        symbol={ portfolioItem.symbol }
        value={ portfolioItem.value }
      />
    ))}
  </div>
);

const mapStateToProps = state => {
  return {
    ...state.crypto
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTimerEnd: () => {
      dispatch({ type: actions.FETCH_CRYPTO_DATA });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoRoot);
