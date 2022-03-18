import React, { useState, useEffect } from "react";

export default function MemeIt({ allMemes }) {
  const [amountOfText, setAmountOfText] = useState(1);
  const [textInput, setTextInput] = useState([]);
  const [actualPic, setActualPic] = useState(0);
  const [textInPic, setTextInPic] = useState([]);
  const [textObj, setTextObj] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [positioningMode, setPositioningMode] = useState(false);
  const [positioningTarget, setPositioningTarget] = useState();

  useEffect(() => {
    let tempArrInputs = [];
    let tempTexts = [];
    let tempBounds = [];

    for (let i = 1; i <= amountOfText; i++) {
      tempArrInputs.push(
        <div key={i}>
          <input
            type="text"
            placeholder={`Text ${i}`}
            onChange={(e) => changeText(e.target.value, i)}
          />
          <button onClick={() => positionText(i - 1)}>
            Text Positionieren
          </button>
        </div>
      );
      tempTexts.push(`text${i}`);
      tempBounds.push({ x: "0px", y: `${(i - 1) * 20}px` });
    }
    setTextInput(tempArrInputs);
    setTextObj(tempTexts);
    setBounds(tempBounds);
  }, [amountOfText]);

  useEffect(
    () =>
      setTimeout(() => {
        console.log("hey");

        let tempArrParagraphs = [];
        if (bounds.length > 0) {
          for (let i = 1; i <= amountOfText; i++) {
            tempArrParagraphs.push(
              <p
                key={i}
                style={{
                  margin: "0",
                  position: "absolute",
                  top: bounds[i - 1].y,
                  left: bounds[i - 1].x,
                }}
              >
                {textObj[i - 1]}
              </p>
            );
            setTextInPic(tempArrParagraphs);
          }
        }
      }, 100),
    [bounds]
  );

  function positionText(textNumber) {
    setPositioningMode(!positioningMode);
    setPositioningTarget(textNumber);
  }

  function changePositionOfText(event) {
    console.log("BOUNDS BEFORE CHANGE", bounds);
    if (positioningMode) {
      if (event.target.className === "meme-Img") {
        let x = `${event.pageX}px`;
        let y = `${event.pageY}px`;
        let tempArr = bounds;

        console.log("temp1", tempArr);

        tempArr = bounds.splice(0, 1, { x, y });

        console.log("BOUNDS AT CHANGE", bounds);
        console.log("temp2", tempArr);
        console.log("coor", x + " " + y);

        setBounds(tempArr);

        setPositioningMode(!positioningMode);
      }
    }
  }

  console.log("BOUNDS", bounds);

  function changeText(userInput, textId) {
    if (userInput !== "") {
      setTextObj(textObj.slice([textId - 1], 1, userInput));
    }
  }

  function changePic(direction) {
    if (direction === "plus") {
      if (actualPic < 99) {
        setActualPic(actualPic + 1);
      } else {
        setActualPic(0);
      }
    } else if (direction === "min") {
      if (actualPic > 0) {
        setActualPic(actualPic - 1);
      } else {
        setActualPic(99);
      }
    }
  }

  //   console.log("textInPic", textInPic);

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Wieviele Texte?"
          value={amountOfText}
          onChange={(e) => setAmountOfText(e.target.value)}
        />
        {textInput}
      </div>
      <div>
        <button onClick={() => changePic("min")}>Back</button>
        <button onClick={() => changePic("plus")}>Next</button>
        <div
          style={{ position: "relative" }}
          onClick={(e) => changePositionOfText(e)}
        >
          {textInPic && textInPic.map((el) => el)}
          {allMemes && (
            <img
              className="meme-Img"
              src={allMemes.data.memes[actualPic].url}
            />
          )}
        </div>
      </div>
    </div>
  );
}
