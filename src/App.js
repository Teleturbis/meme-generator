import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Contentful from "contentful";

import "./assets/style.css";

import LogIn from "./components/login/LogIn";

import Header from "./components/general/Header";
import Main from "./components/general/Main";
import Footer from "./components/general/Footer";

import MemeIt from "./components/MemeIt"

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    userId: "",
    userName: "",
  });
  const [allMemes, setAllMemes] = useState(false);

  const client = Contentful.createClient({
    space: "hxhr2jn34dq3",
    accessToken: "_wWH78wFKJ8Ayxbq3IJG2JXA4bjjCvDn5H7WZohptvc",
    host: "cdn.contentful.com",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let fetching = await fetch("https://api.imgflip.com/get_memes");
    let data = fetching.json();

    setAllMemes(await data);
  }

  function userLoggedIn(userName, uuid) {
    setUser({ loggedIn: !user.loggedIn, userName: userName, id: uuid });
  }

  console.log("allMemes:", allMemes);

  return (
    <div className="App">
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Main allMemes={allMemes} />} />
        <Route
          path="/user"
          element={
            <LogIn user={user} client={client} userLoggedIn={userLoggedIn} />
          }
        />
        <Route path="/generate-meme" element={<MemeIt allMemes={allMemes} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
