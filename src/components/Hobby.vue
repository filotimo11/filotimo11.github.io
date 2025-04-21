<template>
  <div class="content-section">
    <div class="summary webfont1">
      <p>下面是一些兴趣爱好，点击图片可以查看详细信息。</p>
    </div>
  </div>
  <div class="themes-container">
    <div class="themes-grid">
      <div 
        v-for="(hobby, index) in hobbies" 
        :key="index"
        class="theme-card webfont2"
      >
        <a href="#topic-1_eval" class="theme-link">
          <div class="image-container">
            <img :src="hobby.image" :alt="hobby.title" class="theme-image">
            <h3 class="theme-title static-title">{{ hobby.title }}</h3>
          </div>
          <div class="hover-overlay">
            <div class="overlay-content">
              <h3 class="theme-title hover-title">{{ hobby.title }}</h3>
              <div class="theme-desc">
                <p class="introduction">{{ hobby.description }}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref } from 'vue'
import hobbiesData from '../assets/hobby.json'
 
const hobbies = ref(hobbiesData)
 
</script>
  
  <style scoped>

.summary.webfont1 {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(145deg, #fff8fa 0%, #fff5f7 100%);
  border-radius: 15px;
  margin: 30px auto;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(119,14,28,0.08);
  border: 1px solid #ffe6eb;
}

.summary p {
  color: #770e1c;
  font-size: 1.8rem;
  line-height: 1.8;
  margin: 0;
  padding: 15px;
  position: relative;
}

.summary p::before,
.summary p::after {
  content: "✦";
  color: #ff6b6b;
  padding: 0 10px;
}
  .themes-container {
    padding: 0;
    background: white;
  }
  
  .themes-grid {
    display: flex;
    gap: 1rem;
    max-width: 1100px;
    margin: 0 auto; 
    justify-content: space-between;
  }
  
  .theme-card {
    position: relative;
    overflow: hidden;
    border-radius: 12px;  
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex: 1 1 30%;  
    min-width: 300px; 
    margin: 0 1.5%; 
    max-width: 360px;  
  }
  
  .image-container {
    position: relative;
    height: 250px;
  }
  
  .theme-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .static-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 1.2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 30%, transparent);
    color: white;
    font-size: 1.3rem;
    z-index: 1;
    transition: opacity 0.3s ease;
  }
  
  .hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #770e1c5d;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
    padding: 2rem;
    z-index: 2;
  }
  
  .introduction {
    color: #eee;
    font-size: 1.6rem;
  }
  
  .overlay-content {
    transform: translateY(20px);
    transition: transform 0.3s ease;
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
  
  .theme-card:hover .static-title {
    opacity: 0;
  }
  
  .theme-card:hover .hover-overlay {
    opacity: 1;
  }
  
  .theme-card:hover .overlay-content {
    transform: translateY(0);
  }
  
  .theme-card:hover .theme-image {
    transform: scale(1.05);
  }
  
  .hover-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #fff;
  }
  .theme-desc {
    font-size: 1rem;
    color: #f0f0f0;
  }
  </style>