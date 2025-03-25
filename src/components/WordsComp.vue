<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title class="text-h5">Word List</v-card-title>

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
      headers: [
        { text: "ID", value: "id", align: "start", sortable: true }, // Добавляем sortable
        { text: "English", value: "english" },
        { text: "Ukrainian", value: "ukrainian" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
    };
  },
  methods: {
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
