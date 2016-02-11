(function () {
  "use strict";
  var includeExternal, speakBtn, speechRate, speechText, voicesSelect, voices;

  // This is probably inefficient, but works well enough for the demo
  var removeVoices = function () {
    while (voicesSelect.options.length) {
      voicesSelect.remove(voicesSelect.options.length-1);
    }
  };

  var createVoiceOption = function (voice) {
    var voiceOption = document.createElement('option');
    voiceOption.value = voice.voiceURI;
    voiceOption.text = voice.name + ' (' + voice.lang + ')';
    return voiceOption;
  };

  var populateVoices = function (evt) {
    evt && evt.stopPropagation();
    removeVoices();
    voices = {};
    speechSynthesis.getVoices().forEach(function (voice) {
      if (includeExternal.checked || voice.localService) {
        voicesSelect.add(createVoiceOption(voice));
        voices[voice.voiceURI] = voice;
      }
    });
  };

  var speak = function (evt) {
    evt.stopPropagation();
    var utterance = new SpeechSynthesisUtterance(speechText.value);
    utterance.voice = voices[voicesSelect.selectedOptions[0].value];
    utterance.rate = speechRate.value;
    speechSynthesis.speak(utterance);
  };

  var doInit = function (evt) {
    if (window.speechSynthesis) {
      document.body.className = 'speechapisupported';
    }

    includeExternal = document.getElementById('includeExternal');
    speakBtn = document.getElementById('speak');
    speechRate = document.getElementById('speechRate');
    speechText = document.getElementById('words');
    voicesSelect = document.getElementById('voice');

    speechSynthesis.onvoiceschanged = populateVoices;
    populateVoices();

    speakBtn.addEventListener('click', speak);
    includeExternal.addEventListener('change', populateVoices);
  };

  window.addEventListener('load', doInit);
})();
