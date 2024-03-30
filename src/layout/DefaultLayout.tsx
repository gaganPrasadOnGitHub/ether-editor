import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => (
  <div className="default-layout">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default DefaultLayout;
