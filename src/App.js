import React, {useEffect, useState} from 'react'
import './App.scss';
import COLORS_ARRAY from "./colorsArray.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

let quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";



function App() {
  const [quote, setQuote] = useState('Nothing is impossible, the word itself says, “I’m possible!"');
  const [author, setAuthor] = useState("Aubrey Hepburn");
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#B71C1C')

  const fetchQuotes = async (url) => {
    const response = await fetch (url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(()=> {
    fetchQuotes(quoteDB)
  })

  const generateRandomQuote = () => {
    let randomInteger = Math.floor(Math.random() * quotesArray.length);
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
    setAccentColor(COLORS_ARRAY[randomInteger])
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <p id="text">
            {quote}
          </p>
          <p id="author">
            - {author}
          </p>
          <div className="button-wrapper">
          <div className="button">
          <a id="tweet-quote" style={{backgroundColor: accentColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${author}`)}><FontAwesomeIcon icon ={faTwitter} /></a>
          </div>
          <button id="new-quote" style={{backgroundColor: accentColor}} onClick={() => generateRandomQuote()}>
            Change Quote
          </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
