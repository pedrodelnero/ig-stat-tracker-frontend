import React, { useEffect, useState } from "react";
import axios from "axios";

const igProposal = () => {
  //   const [fileSelected, setFileSelected] = useState("");

  const searchIG = async (e) => {
    e.preventDefault();

    const result = axios.post("http://localhost:5000/ig-proposal");

    console.log(result);
  };

  return (
    <div>
      <h1>File Upload</h1>
      {/* <input
        type="text"
        onChange={(e) => setFileSelected(e.target.files[0])}
      /> */}
      <button type="button" onClick={searchIG}>
        Upload
      </button>
    </div>
  );
};

export default igProposal;
