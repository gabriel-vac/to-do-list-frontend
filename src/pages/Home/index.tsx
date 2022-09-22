import React from 'react';
import Feed from '../../components/Feed';
import Sidebar from '../../components/Sidebar';
import Widgets from '../../components/Widgets';

function Home() {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden ">
        <div className="grid grid-cols-9">
          <Sidebar />

          <Feed />

          <Widgets />
        </div>
      </div>
    </div>
  );
}

export default Home;
