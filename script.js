const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



// Toggle button
 function toggleButton () {
     button.disabled = !button.disabled;
 }

// Passing joke to voiceRSS API
 function tellMe(joke) {
        VoiceRSS.speech({
            key: '0f78ec4752f94023a69219242882cb4d',
            src: joke,
            hl: 'en-us',
            r: 0,
            c: 'mp3',
            f: '44hz_16bit_stereo',
            ssml: false
        });
}
 
// Get Jokes from API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
       const response = await fetch(apiUrl);
       const data = await response.json();
       if(data.setup) {
           joke = `${data.setup} ... ${data.delivery}`;
       } else {
           joke = data.joke;
       }
       // Text-to-Speech
       tellMe(joke);
       // Disable Button
       toggleButton();
    }catch(err){
        // Give error to me!
        console.log('Whooops, error',err);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);