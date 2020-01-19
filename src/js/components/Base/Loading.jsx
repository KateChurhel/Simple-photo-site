// libraries
import React from 'react';

const LoadingBlock = ({ isLoadingShown }) => (isLoadingShown ? (
  <div className="loading">
    <div className="loader">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  </div>
) : '');

export default LoadingBlock;
