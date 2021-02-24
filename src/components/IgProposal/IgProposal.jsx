import React, { useEffect, useState } from "react";
import axios from "axios";

const IgProposal = () => {
  const [igHandle, setIgHandle] = useState("theclaudiachronicles");
  const [numOfPosts, setNumOfPosts] = useState(3);
  const [amountOfFollowers, setAmountOfFollowers] = useState(null);
  const [averageLikes, setAverageLikes] = useState(null);

  const searchIG = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/ig-proposal", {
        igHandle,
        numOfPosts,
      });
      localStorage.setItem(data.username, JSON.stringify(data));

      setAmountOfFollowers(data.followers);
      setAverageLikes(data.likes);
    } catch (err) {
      console.log(`Errpr: ${err}`);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input
        type="text"
        value={igHandle}
        onChange={(e) => setIgHandle(e.target.value)}
      />
      <input
        type="number"
        value={numOfPosts}
        onChange={(e) => setNumOfPosts(e.target.value)}
      />
      <button type="button" onClick={searchIG}>
        Upload
      </button>
      <div>
        <h1>Stats</h1>
        <div>
          <h4>Followers:</h4>
          <p>{amountOfFollowers}</p>
        </div>
        <div>
          <h4>Avg Likes for last {numOfPosts} Posts:</h4>
          <p>{averageLikes}</p>
        </div>
      </div>
      <button>Download</button>
    </div>
  );
};

export default IgProposal;
