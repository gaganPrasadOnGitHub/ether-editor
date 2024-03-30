import React from 'react';
import EntryForm from '../components/EntryForm';

const Home: React.FC = () => {
  return (
    <div className="container home flex-default justify-center">
      <h1 className="main-heading flex-1">
        The best place to collaborate on code and edit in{' '}
        <span className="main-color">realtime</span>.
      </h1>
      <EntryForm />
    </div>
  );
};

export default Home;
