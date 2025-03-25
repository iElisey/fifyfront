<template>
  <v-app>
    <v-main>
      <WordsComp/>
    </v-main>
  </v-app>
</template>

<script>
import WordsComp from "@/components/WordsComp.vue";

export default {
  name: 'App',

  components: {
    WordsComp,
  },

  data: () => ({
    //
  }),
};
</script>
