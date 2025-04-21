<template>
  <main>
    <Navigation />
    <Introduction />
    <Summary />
    <Quote />
    <Hobby /> 
    <Book />
    <Game /> 
    <!-- <GameExplanation /> -->
    <WordCloud /> 
  </main>
  <!-- <Footer /> -->
</template>

<script setup>
import Summary from './components/Summary.vue'
import Quote from './components/Quote.vue'
import Hobby from './components/Hobby.vue'
import Book from './components/Book.vue'
import Navigation from './components/Navigation.vue'
import Game from './components/Game.vue'
import WordCloud from './components/WordCloud.vue'
// import Footer from './components/Footer.vue'
import Introduction from './components/Introduction.vue'
</script>