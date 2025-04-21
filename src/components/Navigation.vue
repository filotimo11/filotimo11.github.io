<template>
  <div id="header">
    <h3 class="webfont2">
      <a href="index.html">{{ personal.name }}</a>
    </h3>
    
    <div class="links">
      <label class="hamb webfont2" @click="toggleMenu">
        <span class="hamb-line"></span>
      </label>
      
      <nav class="nav webfont2" :style="{ maxHeight: isMenuOpen ? '500px' : '0' }">
        <div class="menu webfont2">
          <a 
            v-for="(item, index) in navItems"
            :key="index"
            :href="item.link"
            :class="{ 
              selected: item.isSelected, 
              lab: item.isLab 
            }"
            @click="handleNavClick(item)"
          >
            {{ item.text }}
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>
 
<script setup>
import { ref } from 'vue'
import data from '../assets/data.json'
 
// 响应式状态管理
const isMenuOpen = ref(false)
const personal = ref(data.personal)
 
// 导航项配置
const navItems = ref([
  { text: '关于', link: 'AAA.html', isSelected: true },
  { text: '简介', link: 'BBB.html', isLab: true },
  { text: '专业', link: 'CCC.html' },
  { text: '爱好', link: '/~sherryw/group.html#publications', action: 'reload' },
  { text: '经历', link: '/~sherryw/CV.html#teaching', action: 'reload' },
  { text: '其他', link: '/~sherryw/CV.html#talks', action: 'reload' }
])
 
// 方法定义
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
 
const handleNavClick = (item) => {
  if (item.action === 'reload') {
    location.reload()
  }
  
  // 更新选中状态
  navItems.value = navItems.value.map(nav => 
    nav === item ? { ...nav, isSelected: true } : { ...nav, isSelected: false }
  )
  
  // 关闭菜单
  isMenuOpen.value = false
}
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
  position: relative;
}

.hamb {
  cursor: pointer;
  z-index: 999;
  padding: 5px 20px;
  display: block;
}

.hamb-line {
  background: black;
  display: block;
  height: 2px;
  position: relative;
  width: 24px;
  margin: 5px 0;
}

.nav {
  width: 100%;
  position: fixed;
  background-color: #f1f3f4;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  top: 60px;
  left: 0;
}

.menu {
  padding: 15px 0;
}

.menu a {
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s ease;
}

.menu a.lab {
  color: #770e1c;
  font-weight: 500;
}

.menu a.selected {
  font-weight: 800;
  color: #000;
}

.menu a:hover {
  color: #fff;
  background-color: #770e1c;
  padding: 10px 20px;
}

@media (min-width: 768px) {
  .hamb {
    display: none;
  }
  
  .nav {
    position: static;
    background: transparent;
    max-height: none !important;
    box-shadow: none;
    width: auto;
  }

  .menu {
    display: flex;
    gap: 40px;
    padding: 0;
  }

  .menu a {
    padding: 5px 0;
  }
}
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  max-height:35px;
  margin: 0 auto;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
  position: relative;
  font-size: 1.4rem !important;
}

#header .links .hamb {
  cursor: pointer;
  z-index: 999;
  padding: 5px 20px;
  display: block;
}

#header .links .hamb-line {
  background: black;
  display: block;
  height: 2px;
  position: relative;
  width: 24px;
  margin: 5px 0;
}

#header .links .nav {
  width: 100%;
  position: fixed;
  background-color: #f1f3f4;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-out;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  top: 60px;
  left: 0;
}

#header .links .menu {
  padding: 15px 0;
}

#header .links .menu a {
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
}

@media screen and (min-width: 768px) {
  #header .links .hamb {
    display: none;
  }
  
  #header .links .nav {
    position: static;
    background: transparent;
    max-height: none !important;
    box-shadow: none;
    width: auto;
  }

  #header .links .menu {
    display: flex;
    gap: 40px;
    padding: 0;
  }

  #header .links .menu a {
    padding: 5px 0;
  }
}

#header .links a.lab {
  color: #770e1c;
  font-weight: 500;
}

#header .links a.selected {
  font-weight: 800;
  color: #000;
}

#header .links a:hover {
  color: #fff;
  background-color: #770e1c;
  text-decoration: none;
  transition: all 0.2s ease;
  text-decoration: none;
  padding-left: 25px;
  padding-right: 25px;
  margin-left: -20px;
  margin-right: -20px;
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