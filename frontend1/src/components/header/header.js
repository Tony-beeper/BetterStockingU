import React from "react";
import logo from "./logo.svg";
import "./header.css";

function Header(props) {
  return (
    <div className={"header " + props.sentiment}>
      <div>Market Sentiment is Currently</div>
      <div className="sentiment">
        <div id="pos">Positive.</div>
        <div id="neu">Neutral.</div>
        <div id="neg">Negative.</div>
      </div>
    </div>
  );
}

export default Header;
