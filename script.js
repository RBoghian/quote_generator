const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new Quote
function newQuote(){
    showLoadingSpinner();

    //Quotes
// //Pick a random quote from API
//const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// //Check if author field is null
// if(!quote.author){
//     authorText.textContent = 'Unknown';
// }else{
//     authorText.textContent = quote.author;
// }
// //Check quote length for the proper css
// if(quote.text.length > 120){
//     quoteText.classList.add('long-quote');
// }else{
//     quoteText.classList.remove('long-quote');
// }
// //Set quote, hide loader
// quoteText.textContent = quote.text;
// complete();

//Dad jokes
// check quote length to determine styling
if (apiQuotes.length > 60) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // set quote, hide loader
  quoteText.textContent = apiQuotes;
  removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://icanhazdadjoke.com/';

    //Quotes
    // try {
    //     const response = await fetch(apiUrl);
    //     apiQuotes = await response.json();
    //     newQuote();
    // }catch (error) {
       
    //Dad jokes
        try{
            var myHeaders = new Headers();
            myHeaders.append('Accept', 'application/json');

                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };

             const response = await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => (apiQuotes = result.joke))
            .catch((error) => console.log('error', error));
          console.log(apiQuotes);
          newQuote();
        } catch (error) {
          console.log('ERROR! ', error);
        }
      }

//Tweet Quote
function tweetQuote(){
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent}&hashtags=dadjokes,dadquotes`;
    window.open(twitterUrl, `_blank`);
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

//On Load

getQuotes();
