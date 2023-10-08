const synth = window.speechSynthesis;
let voices = [];

export function init(ctx, data) {
  ctx.importCSS(
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
  );
  ctx.importCSS("main.css");

  ctx.synth = synth;

  ctx.root.innerHTML = `
        <div class="app">
          <div class="header">
            <select id="voices" class="input"></select>
            <input type="range" min="0.5" max="2" value="1" step="0.1" id="rate" />
            <input type="range" min="0" max="2" value="1" step="0.1" id="pitch" />
          </div>
        </div>
      `;

  ctx.handleSync(() => {
    // Synchronously invokes change listeners
    document.activeElement &&
      document.activeElement.dispatchEvent(new Event("change"));
  });

  function populateVoiceList() {
    // voices = synth.getVoices().sort(function (a, b) {
    //   const aname = a.name.toUpperCase();
    //   const bname = b.name.toUpperCase();

    //   if (aname < bname) {
    //     return -1;
    //   } else if (aname == bname) {
    //     return 0;
    //   } else {
    //     return +1;
    //   }
    // });
    // console.log(voices);

    voices = synth.getVoices();
    const voiceSelect = document.querySelector("#voices");
    const selectedIndex =
      voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = "";

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " -- DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }

    voiceSelect.selectedIndex = selectedIndex;
  }

  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = setTimeout(function () {
      populateVoiceList();
    }, 1000);
  }

  ctx.handleEvent("speak", ({ text }) => {
    let speakingText = text.replace("**Speaking**: ", "");
    console.log(`Speaking: ${speakingText}`);

    const voiceSelect = document.querySelector("#voices");
    const pitch = document.querySelector("#pitch");
    const rate = document.querySelector("#rate");

    if (ctx.synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }
    const utterThis = new SpeechSynthesisUtterance(speakingText);

    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }

    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  });
}
