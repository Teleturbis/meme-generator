import React from "react";

export default function Main({ allMemes }) {
  let random = Math.floor(Math.random() * 100);

  return (
    <div className="mainDiv">
      {allMemes && (
        <img className="main-Img" src={allMemes.data.memes[random].url} />
      )}
    </div>
  );
}
