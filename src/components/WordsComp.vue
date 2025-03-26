<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title class="text-h5">Word List</v-card-title>
      <!-- Форма для масового введення слів -->
      <v-form @submit.prevent="addWordsFromInput">
        <v-row>
          <v-col cols="10">
            <v-textarea
                v-model="bulkWords"
                label="Enter words (e.g., eng=ukr=topic)"
                outlined
                dense
                placeholder="apple=яблуко=food"
            ></v-textarea>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" @click="addWordsFromInput" block> Add Bulk </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Форма добавления -->
      <v-form @submit.prevent="addWord">
        <v-row>
          <v-col cols="5">
            <v-text-field
                v-model="newWord.english"
                label="English"
                outlined
                dense
                required
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field
                v-model="newWord.ukrainian"
                label="Ukrainian"
                outlined
                dense
                required
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" @click="addWord" block> Add </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Таблица с сортировкой -->
      <v-data-table
          :headers="headers"
          :items="words"
          class="elevation-2 mt-4"
          :sort-by="'id'"
      :sort-desc="true"
      >
      <!-- Слоты для каждого столбца -->
      <template v-slot:[`item.english`]="{ item }">
        <v-text-field v-model="item.english" dense></v-text-field>
      </template>
      <template v-slot:[`item.ukrainian`]="{ item }">
        <v-text-field v-model="item.ukrainian" dense></v-text-field>
      </template><template v-slot:[`item.topic`]="{ item }">
        <v-text-field v-model="item.topic" dense></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="green" icon @click="updateWord(item)">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn color="red" icon @click="deleteWord(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      words: [],
      url: "https://fify-hhc6asgfhsctg0hj.francecentral-01.azurewebsites.net",
      newWord: { english: "", ukrainian: "" },
      bulkWords: "", // Нове поле для масового введення

      headers: [
        { text: "ID", value: "id", align: "start", sortable: true }, // Добавляем sortable
        { text: "English", value: "english" },
        { text: "Ukrainian", value: "ukrainian" },
        { text: "Topic", value: "topic" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
    };
  },
  methods: {
    async addWordsFromInput() {
      if (!this.bulkWords) return;

      // Розбиваємо введений текст на рядки (дозволяємо кілька слів через перенос рядка)
      const lines = this.bulkWords.split("\n").filter(line => line.trim() !== "");
      const wordList = lines.map(line => {
        const [english, ukrainian, topic] = line.split("=");
        return {
          english: english?.trim() || "",
          ukrainian: ukrainian?.trim() || "",
          topic: topic?.trim() || "other" // Якщо теми немає, ставимо "other"
        };
      }).filter(word => word.english && word.ukrainian); // Фільтруємо некоректні записи

      if (wordList.length === 0) {
        console.error("No valid words to add");
        return;
      }

      try {
        await axios.post(`${this.url}/api/words`, wordList); // Відправляємо список слів
        this.bulkWords = ""; // Очищаємо поле
        this.fetchWords(); // Оновлюємо таблицю
      } catch (error) {
        console.error("Error adding bulk words:", error);
      }
    },
    async fetchWords() {
      try {
        const response = await axios.get(`${this.url}/api`);
        this.words = response.data;
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    },
    async addWord() {
      if (!this.newWord.english || !this.newWord.ukrainian) return;
      try {
        await axios.post(`${this.url}/api`, this.newWord);
        this.newWord.english = "";
        this.newWord.ukrainian = "";
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
  },
  mounted() {
    this.fetchWords();
  },
};
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
}
</style>
