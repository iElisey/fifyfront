<template>
  <v-app>
    <!-- Діалог для заблокованих користувачів -->
    <v-dialog v-model="isBlocked" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Access Blocked</v-card-title>
        <v-card-text>
          <p>You have exceeded the maximum number of login attempts. Your IP is blocked.</p>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Діалог для введення імені користувача та пароля -->
    <v-dialog v-if="!isBlocked" v-model="showPasswordDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Login</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="usernameInput"
              label="Username"
              outlined
              @keyup.enter="focusPassword"
              autofocus
          ></v-text-field>
          <v-text-field
              v-model="passwordInput"
              label="Password"
              type="password"
              outlined
              ref="passwordField"
              @keyup.enter="checkCredentials"
          ></v-text-field>
          <v-alert v-if="loginError" type="error" dense>
            Incorrect username or password. Attempts left: {{ 3 - loginAttempts }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="checkCredentials" block>Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Основний вміст, доступний після введення правильних даних -->
    <v-container v-if="isAuthenticated" fluid>
      <!-- Кнопка для запуску тесту перед таблицею -->
      <v-row justify="center" class="mb-4">
        <v-btn color="primary" @click="openTestDialog" large>
          <v-icon left>mdi-play</v-icon> Start Test
        </v-btn>
      </v-row>

      <!-- Діалог для тестів -->
      <v-dialog v-model="testDialog" max-width="600px" :fullscreen="$vuetify.breakpoint.xs" persistent>
        <v-card>
          <v-card-title class="text-h5">
            {{ testStarted ? 'Test in Progress' : 'Start a Test' }}
            <v-spacer></v-spacer>
            <v-btn icon @click="closeTestDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-if="!testStarted">
            <v-select
                v-model="selectedTopic"
                :items="['All Topics', ...uniqueTopics]"
                label="Select Topic"
                outlined
                prepend-icon="mdi-book-open-variant"
            ></v-select>
            <v-radio-group v-model="testDirection" row dense>
              <v-radio label="Eng → Ukr" value="engToUkr"></v-radio>
              <v-radio label="Ukr → Eng" value="ukrToEng"></v-radio>
            </v-radio-group>
            <v-select
                v-model="testType"
                :items="['Open-ended', 'Multiple Choice', 'Word Memory Match']"
                label="Test Type"
                outlined
            ></v-select>
            <v-select
                v-model="questionsCount"
                :items="[5, 10, 20, 'All']"
                label="Number of Questions"
                outlined
            ></v-select>
          </v-card-text>

          <!-- Open-ended тест -->
          <v-card-text v-if="testStarted && testType === 'Open-ended'">
            <p class="text-h6">Translate: <strong>{{ questionText }}</strong></p>
            <v-text-field
                v-model="userAnswer"
                label="Your answer"
                outlined
                @keyup.enter="checkAnswer"
                autofocus
            ></v-text-field>
            <v-alert
                v-if="answerChecked"
                :type="isCorrect ? 'success' : 'error'"
                dense
                class="mt-4"
            >
              {{ isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${correctAnswer}` }}
            </v-alert>
            <v-row class="mt-2">
              <v-col cols="12" sm="6">
                <v-btn color="primary" @click="checkAnswer" large block>
                  <v-icon left>mdi-check</v-icon> Submit
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn color="error" @click="stopTest" large block>
                  <v-icon left>mdi-stop</v-icon> Stop Test
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Multiple Choice тест -->
          <v-card-text v-if="testStarted && testType === 'Multiple Choice'">
            <p class="text-h6">Translate: <strong>{{ questionText }}</strong></p>
            <v-row class="mt-4">
              <v-col v-for="(option, index) in options" :key="index" cols="12" sm="6">
                <v-btn
                    :color="selectedOption === option ? (isCorrect ? 'success' : 'error') : 'grey lighten-2'"
                    @click="selectOption(option)"
                    class="mb-2 clean-btn"
                    block
                >
                  {{ option }}
                </v-btn>
              </v-col>
            </v-row>
            <v-alert
                v-if="answerChecked"
                :type="isCorrect ? 'success' : 'error'"
                dense
                class="mt-4"
            >
              {{ isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${correctAnswer}` }}
            </v-alert>
            <v-btn color="error" @click="stopTest" large block class="mt-2">
              <v-icon left>mdi-stop</v-icon> Stop Test
            </v-btn>
          </v-card-text>

          <!-- Word Memory Match тест -->
          <v-card-text v-if="testStarted && testType === 'Word Memory Match'">
            <v-row>
              <v-col v-for="(card, index) in memoryCards" :key="index" cols="6" sm="3">
                <v-card
                    :color="card.flipped || card.matched ? 'primary' : 'grey lighten-2'"
                    class="memory-card"
                    @click="flipCard(index)"
                >
                  <v-card-text class="text-center">
                    {{ card.flipped || card.matched ? card.text : '???' }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col cols="12" sm="6">
                <v-btn color="primary" @click="resetMemoryGame" large block>
                  <v-icon left>mdi-restart</v-icon> Restart
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn color="error" @click="stopTest" large block>
                  <v-icon left>mdi-stop</v-icon> Stop Test
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions v-if="!testStarted">
            <v-btn color="grey" text @click="testDialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="startTest" :disabled="!selectedTopic">Start</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Секція для списку слів -->
      <v-card class="pa-5 clean-card">
        <v-card-title class="text-h5">Word List</v-card-title>
        <!-- Поле пошуку -->
        <v-text-field
            v-model="searchQuery"
            label="Search words"
            outlined
            prepend-inner-icon="mdi-magnify"
            clearable
            class="mb-4"
        ></v-text-field>

        <v-form @submit.prevent="addWordsFromInput">
          <v-row>
            <v-col cols="12" sm="9">
              <v-textarea
                  v-model="bulkWords"
                  label="Enter words (e.g., eng=ukr=topic)"
                  outlined
                  placeholder="apple=яблуко=food"
                  rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn color="primary" @click="addWordsFromInput" block large>Add Bulk</v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-form @submit.prevent="addWord">
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field v-model="newWord.english" label="English" outlined required></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field v-model="newWord.ukrainian" label="Ukrainian" outlined required></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field v-model="newWord.topic" label="Topic" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn color="primary" @click="addWord" block large>Add</v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-data-table
            :headers="headers"
            :items="filteredWordsList"
            class="mt-4 clean-table"
            :sort-by="'id'"
            :sort-desc="true"
        >
          <template v-slot:[`item.english`]="{ item }">
            <v-text-field v-model="item.english" dense></v-text-field>
          </template>
          <template v-slot:[`item.ukrainian`]="{ item }">
            <v-text-field v-model="item.ukrainian" dense></v-text-field>
          </template>
          <template v-slot:[`item.topic`]="{ item }">
            <v-text-field v-model="item.topic" dense></v-text-field>
          </template>
          <template v-slot:[`item.createdAt`]="{ item }">
            <v-text-field
                v-model="item.createdAt"
                :value="formatDate(item.createdAt)"
            dense></v-text-field>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="success" icon @click="updateWord(item)">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
            <v-btn color="error" icon @click="deleteWord(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // Authentication and blocking state
      showPasswordDialog: true,
      usernameInput: "",
      passwordInput: "",
      loginError: false,
      isAuthenticated: false,
      loginAttempts: 0,
      userIP: "",
      isBlocked: false,
      blockedIPs: [],

      // Main app data
      words: [],
      url: "https://fify-hhc6asgfhsctg0hj.francecentral-01.azurewebsites.net",
      newWord: { english: "", ukrainian: "", topic: "" },
      bulkWords: "",
      searchQuery: "",
      testDialog: false,
      selectedTopic: null,
      testDirection: "engToUkr",
      testType: "Open-ended",
      questionsCount: "All",
      testWords: [],
      currentQuestion: null,
      questionText: "",
      correctAnswer: "",
      userAnswer: "",
      selectedOption: null,
      options: [],
      testStarted: false,
      answerChecked: false,
      isCorrect: false,
      correctAnswers: 0,
      totalQuestions: 0,
      memoryCards: [],
      flippedCards: [],
      matchedPairs: 0,
      headers: [
        { text: "ID", value: "id", align: "start", sortable: true },
        { text: "English", value: "english" },
        { text: "Ukrainian", value: "ukrainian" },
        { text: "Topic", value: "topic" },
        { text: "Created at", value: "createdAt" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
    };
  },
  computed: {

    uniqueTopics() {
      const topics = this.words.map((word) => word.topic).filter(Boolean);
      return [...new Set(topics)];
    },
    filteredWords() {
      if (this.selectedTopic === "All Topics") {
        return this.words;
      }
      return this.words.filter((word) => word.topic === this.selectedTopic);
    },
    filteredWordsList() {
      if (!this.searchQuery) return this.words;
      const query = this.searchQuery.toLowerCase();
      return this.words.filter(
          (word) =>
              word.english.toLowerCase().includes(query) ||
              word.ukrainian.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    },
    async fetchUserIP() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        this.userIP = data.ip;
        this.checkIfBlocked();
      } catch (error) {
        console.error("Error fetching IP:", error);
        this.userIP = "unknown";
        this.checkIfBlocked();
      }
    },
    checkIfBlocked() {
      const storedBlockedIPs = JSON.parse(localStorage.getItem("blockedIPs") || "[]");
      this.blockedIPs = storedBlockedIPs;
      if (this.blockedIPs.includes(this.userIP)) {
        this.isBlocked = true;
        this.showPasswordDialog = false;
      }
    },
    blockIP() {
      this.blockedIPs.push(this.userIP);
      localStorage.setItem("blockedIPs", JSON.stringify(this.blockedIPs));
      this.isBlocked = true;
      this.showPasswordDialog = false;
    },
    focusPassword() {
      this.$refs.passwordField.focus();
    },
    async checkCredentials() {
      try {
        const response = await axios.post(`${this.url}/api/login`, {
          username: this.usernameInput,
          password: this.passwordInput,
          ip: this.userIP,
        });

        if (response.data.success) {
          this.isAuthenticated = true;
          this.showPasswordDialog = false;
          this.loginError = false;
          this.loginAttempts = 0;
          this.fetchWords(); // Load words after successful login
        } else {
          this.loginAttempts++;
          this.loginError = true;
          this.passwordInput = "";
          this.usernameInput = "";
          if (this.loginAttempts >= 3) {
            this.blockIP();
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        this.loginError = true;
        this.loginAttempts++;
        if (this.loginAttempts >= 3) {
          this.blockIP();
        }
      }
    },
    async addWordsFromInput() {
      if (!this.bulkWords) return;
      const lines = this.bulkWords.split("\n").filter((line) => line.trim());
      const wordList = lines
          .map((line) => {
            const [english, ukrainian, topic] = line.split("=");
            return {
              english: english?.trim() || "",
              ukrainian: ukrainian?.trim() || "",
              topic: topic?.trim() || "other",
            };
          })
          .filter((word) => word.english && word.ukrainian);
      if (wordList.length === 0) return;
      try {
        await axios.post(`${this.url}/api/words`, wordList);
        this.bulkWords = "";
        this.fetchWords();
      } catch (error) {
        console.error("Error adding bulk words:", error);
      }
    },
    async fetchWords() {
      try {
        const response = await axios.get(`${this.url}/api`);
        this.words = response.data;

        console.log(this.words[1436], this.words[1435])
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    },
    async addWord() {
      if (!this.newWord.english || !this.newWord.ukrainian) return;
      try {
        await axios.post(`${this.url}/api`, this.newWord);
        this.newWord = { english: "", ukrainian: "", topic: "" };
        this.fetchWords();
      } catch (error) {
        console.error("Error adding word:", error);
      }
    },
    async updateWord(word) {
      try {
        await axios.put(`${this.url}/api`, word);
        this.fetchWords();
      } catch (error) {
        console.error("Error updating word:", error);
      }
    },
    async deleteWord(id) {
      try {
        await axios.delete(`${this.url}/api?id=${id}`);
        this.fetchWords();
      } catch (error) {
        console.error("Error deleting word:", error);
      }
    },
    openTestDialog() {
      this.testDialog = true;
      this.testStarted = false;
      this.resetTestState();
    },
    closeTestDialog() {
      this.testDialog = false;
      this.testStarted = false;
      this.resetTestState();
    },
    startTest() {
      let availableWords = this.shuffleArray([...this.filteredWords]);
      if (this.questionsCount !== "All") {
        const count = Math.min(this.questionsCount, availableWords.length);
        availableWords = availableWords.slice(0, count);
      }
      this.testWords = availableWords;
      this.totalQuestions = this.testWords.length;
      this.correctAnswers = 0;
      this.testStarted = true;
      if (this.testType === "Word Memory Match") {
        this.startMemoryGame();
      } else {
        this.nextQuestion();
      }
    },
    nextQuestion() {
      if (this.testWords.length === 0) {
        this.endTest();
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.testWords.length);
      this.currentQuestion = this.testWords[randomIndex];
      this.testWords.splice(randomIndex, 1);
      this.questionText =
          this.testDirection === "engToUkr"
              ? this.currentQuestion.english
              : this.currentQuestion.ukrainian;
      this.correctAnswer =
          this.testDirection === "engToUkr"
              ? this.currentQuestion.ukrainian
              : this.currentQuestion.english;
      this.userAnswer = "";
      this.selectedOption = null;
      this.answerChecked = false;
      if (this.testType === "Multiple Choice") {
        this.generateOptions();
      }
    },
    generateOptions() {
      const allAnswers = this.words.map((word) =>
          this.testDirection === "engToUkr" ? word.ukrainian : word.english
      );
      const incorrectAnswers = allAnswers.filter(
          (answer) => answer !== this.correctAnswer
      );
      const shuffled = this.shuffleArray(incorrectAnswers);
      this.options = [
        this.correctAnswer,
        ...shuffled.slice(0, 3),
      ].sort(() => 0.5 - Math.random());
    },
    selectOption(option) {
      this.selectedOption = option;
      this.answerChecked = true;
      this.isCorrect = this.selectedOption === this.correctAnswer;
      if (this.isCorrect) this.correctAnswers++;
      setTimeout(() => this.nextQuestion(), 1000);
    },
    checkAnswer() {
      this.answerChecked = true;
      this.isCorrect =
          this.userAnswer.toLowerCase() === this.correctAnswer.toLowerCase();
      if (this.isCorrect) this.correctAnswers++;
      setTimeout(() => this.nextQuestion(), 1000);
    },
    stopTest() {
      this.testStarted = false;
      alert(`Test stopped! Results: ${this.correctAnswers} correct out of ${this.totalQuestions}`);
    },
    endTest() {
      this.testStarted = false;
      alert(`Test completed! Results: ${this.correctAnswers} correct out of ${this.totalQuestions}`);
    },
    startMemoryGame() {
      const wordsToMatch = this.shuffleArray(this.testWords).slice(0, 8);
      const cards = [
        ...wordsToMatch.map((word) => ({ text: word.english, pair: word.ukrainian, flipped: false, matched: false })),
        ...wordsToMatch.map((word) => ({ text: word.ukrainian, pair: word.english, flipped: false, matched: false })),
      ];
      this.memoryCards = this.shuffleArray(cards);
      this.flippedCards = [];
      this.matchedPairs = 0;
      this.totalQuestions = this.memoryCards.length / 2;
      this.correctAnswers = 0;
    },
    flipCard(index) {
      const card = this.memoryCards[index];
      if (card.flipped || card.matched || this.flippedCards.length >= 2) return;

      card.flipped = true;
      this.flippedCards.push({ index, card });
      this.$forceUpdate();

      if (this.flippedCards.length === 2) {
        const [first, second] = this.flippedCards;
        if (first.card.pair === second.card.text && second.card.pair === first.card.text) {
          first.card.matched = true;
          second.card.matched = true;
          this.matchedPairs++;
          this.correctAnswers++;
          this.flippedCards = [];
          if (this.matchedPairs === this.memoryCards.length / 2) {
            setTimeout(() => {
              alert(`Test completed! Results: ${this.correctAnswers} correct out of ${this.totalQuestions}`);
              this.testStarted = false;
            }, 500);
          }
        } else {
          setTimeout(() => {
            first.card.flipped = false;
            second.card.flipped = false;
            this.flippedCards = [];
            this.$forceUpdate();
          }, 1000);
        }
      }
    },
    resetMemoryGame() {
      this.startMemoryGame();
    },
    resetTestState() {
      this.testWords = [];
      this.currentQuestion = null;
      this.questionText = "";
      this.correctAnswer = "";
      this.userAnswer = "";
      this.selectedOption = null;
      this.options = [];
      this.answerChecked = false;
      this.isCorrect = false;
      this.correctAnswers = 0;
      this.totalQuestions = 0;
      this.memoryCards = [];
      this.flippedCards = [];
      this.matchedPairs = 0;
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
  mounted() {
    this.fetchUserIP(); // Fetch IP on load
  },
};
</script>

<style scoped>
.v-container {
  max-width: 1000px;
  margin: auto;
  padding: 0 16px; /* Відступи для телефонів */
}

.clean-card {
  background: #f5f6f5;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.text-h5 {
  color: #333;
  font-weight: 500;
}

.v-text-field,
.v-select {
  border-radius: 8px;
}

.clean-table {
  background: transparent;
}

.clean-table >>> .v-data-table__wrapper {
  background: #fff;
  border-radius: 8px;
}

.clean-table >>> th {
  color: #333 !important;
  font-weight: 500;
}

.clean-table >>> td {
  color: #555 !important;
}

.clean-btn {
  border-radius: 8px;
  transition: all 0.2s;
}

.clean-btn:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}

.memory-card {
  height: 80px; /* Зменшено для телефонів */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.memory-card:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Адаптація для малих екранів */
@media (max-width: 600px) {
  .v-card-title {
    font-size: 1.25rem;
  }
  .v-btn {
    padding: 0 12px;
  }
  .memory-card {
    height: 60px;
    font-size: 0.9rem;
  }
}
</style>