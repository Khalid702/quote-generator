const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');


let apiQuotes = [];

function showloadingSpinner(){
	loader.hidden = false;
	quoteContainer.hidden = true;
}
function removeLoadingSpinner(){
	quoteContainer.hidden = false;
	loader.hidden = true;
}


//show new Quote
function newQuote(){
  showloadingSpinner()
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  if(!randomQuote.author){ authorText.textContent = 'unknown'};
   authorText.textContent = randomQuote.author;
  
  if(randomQuote.text.length > 80){
   quoteText.classList.add('long-quote');
  } else { quoteText.classList.remove('long-quote')}
  
  quoteText.textContent = randomQuote.text;
  removeLoadingSpinner()
}



//Get Quotes From API
async function getQuotes(){
    showloadingSpinner()
	const apiUrl = 'https://type.fit/api/quotes';
	try{
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
	}catch(err){
      // Catch Error Here
	}
}

///Tweet Quote
function tweetQuote(){
	const twitterUrl = `https://twitter.com/intent/tweet?text=
	${quoteText.textContent} - ${authorText.textContent}`;
     window.open(twitterUrl,'_blank');
}

//listeners go at end
newQuoteBtn.addEventListener('click',newQuote)

twitterBtn.addEventListener('click',tweetQuote)

getQuotes();
