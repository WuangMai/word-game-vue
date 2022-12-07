import Constants from "./Constants.js";

const app = Vue.createApp({
  data() {
    return {
      currentWord: "",
      currentGuess: [],
      tries: 0,
      progress: 0,
      message: "",
    };
  },
  mounted() {
    this.loadGame();
  },
  computed: {
    words() {
      return Constants.WORD_LIST.split(",");
    },
    alphabets() {
      return Constants.ALPHABETS.split("");
    },
    progressPercent() {
      return Math.round((this.progress / this.currentWord.length) * 100);
    },
    degrees() {
      return Math.round((this.progress / this.currentWord.length) * 360);
    },
    puzzleSolved() {
      return this.progress === this.currentWord.length;
    },
  },
  methods: {
    reset() {
      this.currentWord = "";
      this.currentGuess = [];
      this.tries = 0;
      this.progress = 0;
      this.message = "";
    },
    loadGame() {
      this.reset();

      let rnd = Math.floor(Math.random() * this.words.length);
      this.currentWord = this.words[rnd].toUpperCase();
    },

    getGuessedLetter(index) {
      if (this.currentGuess.includes(this.currentWord[index])) {
        return this.currentWord[index];
      }
      return "";
    },

    getLetterButtonClass(letter) {
      if (this.currentGuess.includes(letter)) return "button is-warning";
      return "button is-warning mt-2";
    },
    isDisabled(letter) {
      if (this.currentGuess.includes(letter) || this.puzzleSolved) return true;
      return false;
    },
    makeGuess(letter) {
      if (this.currentGuess.includes(letter)) return;
      this.currentGuess.push(letter);
      this.tries++;

      this.progress += this.currentWord
        .split("")
        .filter((e) => e === letter).length;

      if (this.puzzleSolved) {
        // solved
        this.message = `Gratulacje! Odgadnąłeś słowo ${this.currentWord} w ${this.tries} prób! Kliknij poniżej aby rozpocząć nową grę.`;
      }
    },
  },
});

app.mount("#app");
