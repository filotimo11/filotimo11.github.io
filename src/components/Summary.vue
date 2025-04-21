<template>
    <div class="content-section">
      <div class="summary webfont1">
        <p>{{ summaryData.summary }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import summaryData from '../assets/summary.json'

  </script>

<style scoped>
.content-section {
    width: 100%;
    padding: 2px;
}

blockquote {
    border-left: 4px solid #770e1c;
    margin: 0.5rem 0;
    padding: 0.25rem 0.5rem;
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

 .summary {
  max-width: 1000px;
  margin: 0 auto;
  padding:0;
  line-height: 1.6;
  font-size: 1.6rem ;
}
</style>