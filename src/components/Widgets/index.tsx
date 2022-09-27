import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Widgets() {
  return (
    <div className="col-span-2 mt-2 hidden px-2 lg:inline">
      {/* Search */}
      {/* <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="twitter"
          placeholder="Search Twitter"
          className="flex-1 bg-transparent outline-none" // flex-1 input will take all available space
        />
      </div> */}

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="SuperplayerBR"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widgets;
