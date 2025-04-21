<template>
    <div class="about-section">
      <div class="content-section">
        <blockquote class="webfont2">
          <p><em class="webfont1">{{ quoteData.quote }}</em></p>
        </blockquote>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import quoteData from '../assets/quote.json'

  </script>

<style scoped>
.about-section {
  display: flex;
  gap: 3rem;
  max-width: 1000px;
  max-height:200px;
  margin: 0 auto;
  padding: 15px;
}

.content-section {
    width: 100%;
    padding: 2px;
}

blockquote {
    border-left: 4px solid #770e1c;
    margin: 0.5rem 0;
    padding: 0.25rem 0.5rem;
}

.about-section {
    display: flex;
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
    padding: 15px;
}
@font-face {
  font-family: 'my-web-font1';
  src: url('/fonts/字魂武林江湖体.ttf') format('truetype');
}

@font-face {
  font-family: 'my-web-font2';
  src: url('/fonts/AiDianQuYaYuan-2.ttf') format('truetype');
}

 .webfont1{
  font-family: 'my-web-font1' !important;
  font-size: 1.6rem;

  } 

 .webfont2{
  font-family: 'my-web-font2' !important;
  font-size: 1.2rem;
 }
</style>