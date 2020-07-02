import React from 'react';
import { Ring } from 'react-spinners-css';

const LoadingLayout = ({ isLoading, children }) =>
  isLoading ? <Ring color="#2cbbad" size={70} /> : children;

export default LoadingLayout;