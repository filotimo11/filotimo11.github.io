<template>
  <div class="publications-container webfont2">
    <h2>阅读书目</h2>
    <div 
      v-for="(book, index) in books" 
      :key="index"
      class="publication-card"
    >
      <div class="thumbnail-container">
        <img :src="book.image" :alt="book.title">
      </div>
      <div class="publication-info">
        <div class="publication-title">{{ book.title }}</div>
        <div class="authors-list">
          作者：{{ book.author }}
          <span 
            v-if="book.foreignAuthor" 
            class="primary-author"
          >{{ book.foreignAuthor }}</span>
        </div>
        <div class="read-date-info">阅读时间：{{ book.readDate }}</div>
        <div class="resources-links">
          购买链接 :
          <a 
            :href="book.purchaseLink" 
            target="_blank" 
            class="tooltip-icon"
          >
            <i class="fas fa-shopping-cart"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import booksData from '../assets/book.json'

const books = ref(booksData)

const fetchBooks = async () => {

}


onMounted(() => {
fetchBooks()
})
</script>
  
  <style scoped>
  .publications-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .publication-card {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .thumbnail-container {
    flex: 0 0 200px;
  }
  
  .thumbnail-container img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #dadce0;
  }
  
  .publication-info {
    flex: 1;
  }
  
  .publication-title {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 8px;
  }
  
  .authors-list {
    color: #5f6368;
    margin-bottom: 8px;
  }
  
  .read-date-info {
    color: #5f6368;
    margin-bottom: 12px;
  }
  
  .resources-links {
    display: flex;
    gap: 15px;
    padding-top: 10px;
  }
  
  .tooltip-icon {
    color: #0b0b0b;
    transition: color 0.2s;
  }
  
  .tooltip-icon:hover {
    color: #770e1c;
  }
  
  .primary-author {
    color: #770e1c;
    margin-left: 8px;
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