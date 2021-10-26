
/**
 * Fires when the speak button is clicked and reads the description of the video
 * 
 * @param: none
 * @return: none
 */
function speakButtonOnClick(){
    var toSpeak = new SpeechSynthesisUtterance(videoDescription.innerHTML);
    
    // Adjusts the rate of the speaker
    toSpeak.rate = 0.9;

    voices = speechSynth.getVoices();
    voices.forEach((voice)=>{
        if(voice.name === 'Google UK English Female'){
            toSpeak.voice = voice;
        }
    });
    speechSynth.speak(toSpeak);
}

// Runs on page load
var videoDescription = document.querySelector('#videoDescription');
var speechSynth = window.speechSynthesis;
var voices = [];