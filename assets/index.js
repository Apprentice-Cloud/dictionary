const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  volume = wrapper.querySelector(".word i"),
  infoText = wrapper.querySelector(".info-text"),
  synonyms = wrapper.querySelector(".synonym .list"),
  removeIcon = wrapper.querySelector(".search span");
let audio;

const dataProcessing = (result, word) => {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  } else {
    wrapper.classList.add("active");

    let definitions = result[0].meanings[0].definitions[0];
    let phonetics = `${result[0].meanings[0].partOfSpeech}   ||   pronounced as ${result[0].phonetics[0].text}`;

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;

    if (result[0].phonetics[0].audio) {
      audio = new Audio(result[0].phonetics[0].audio);
    } else {
      audio = new Audio("../noaudio.m4a");
    }

    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText =
      definitions.example ?? `No example available for ${word}`;

    // 02. Synonyms not done
    let synonymlist = result[0].meanings[0].synonyms;
    // console.log(synonymlist);

    for (var i = 0; i < synonymlist.length; i++) {
      let synonymli = document.createElement("span");
      synonymli.innerHTML = synonymlist[i];
      console.log(synonymli);
      console.log(synonyms);
      synonyms.appendChild(synonymli);
    }
  }
};

const queryApi = (word) => {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;

  axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => dataProcessing(res.data, word))
    .catch((err) => console.log(err));
};

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    queryApi(e.target.value);
  }
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  infoText.style.color = "#9A9A9A";
  infoText.innerHTML =
    "Type any existing word and press enter to get meaning, example, synonyms, etc.";
  wrapper.classList.remove("active");
});

volume.addEventListener("click", () => {
  volume.style.color = "#4D59FB";
  audio.play();
  setTimeout(() => {
    volume.style.color = "#999";
  }, 500);
});

// function data(result, word) {
//   // console.log(result);
//   if (result.title) {
//     infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
//   } else {
//     wrapper.classList.add("active");
//     let definitions = result[0].meanings[0].definitions[0];
//     let phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
//     document.querySelector(".word p").innerText = result[0].word;
//     document.querySelector(".word span").innerText = phontetics;
//     document.querySelector(".meaning span").innerText = definitions.definition;
//     document.querySelector(".example span").innerText = definitions.example;
//     audio = new Audio(result[0].phonetics[0].audio);

//     let synonymlist = definitions.synonyms;
//     // console.log(definitions);
//     // console.log(synonymlist);

//     synonyms.innerText = synonymlist[0];
//     console.log(synonyms);

//     for (var i = 0; i < synonymlist.length; i++) {
//       let synonymspans = document.createElement("span");
//       synonymspans.innerHTML = `span> ${synonymlist[i]}, </span>`;
//       // let node = document.createTextNode(synonymlist[i]);
//       console.log(i);
//       synonyms.appendChild(synonymspans);
//       // synonyms.insertAdjacentHTML(synonymspans);
//       console.log(synonymlist[i]);
//     }
//     // synonyms.innerText = synonymlist[0];
//   }
// }

// function fetchApi(word) {
//   wrapper.classList.remove("active");
//   infoText.style.color = "#000";
//   infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
//   let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((result) => data(result, word))
//     .catch(() => {
//       infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
//     });
// }
// searchInput.addEventListener("keydown", (e) => {
//   let word = e.target.value;
//   if (e.key == "Enter" && word) {
//     fetchApi(word);
//   }
// });
// volume.addEventListener("click", () => {
//   volume.style.color = "#4D59FB";
//   audio.type = "audio/mp3";
//   audio.play();
//   setTimeout(() => {
//     volume.style.color = "#999";
//   }, 500);
// });
// removeIcon.addEventListener("click", () => {
//   searchInput.value = "";
//   searchInput.focus();
//   wrapper.classList.remove("active");
//   infoText.style.color = "#9A9A9A";
//   infoText.innerHTML =
//     "Type any existing word and press enter to get meaning, example, synonyms, etc.";
// });
