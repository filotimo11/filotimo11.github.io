<template>
  <div id="header">
    <!-- 左侧区域 -->
    <div class="header-left">
      <h3 class="webfont2">
        <a href="index.html">{{ personal.name }}</a>
      </h3>
    </div>

    <!-- 右侧区域 -->
    <div class="header-right">
      <!-- 主题切换按钮 -->
      <button class="theme-toggle" @click="toggleTheme">
        {{ theme === 'light' ? '🌙' : '☀️' }}
      </button>

      <!-- 移动端菜单按钮 -->
      <label class="hamb webfont2" @click="toggleMenu">
        <span class="hamb-line"></span>
      </label>

      <!-- 桌面端导航菜单 -->
      <a-menu
        class="desktop-menu"
        v-model:selectedKeys="current"
        mode="horizontal"
        :items="formattedItems"
      />

      <!-- 移动端导航菜单 -->
      <a-menu
        class="mobile-menu"
        v-model:selectedKeys="current"
        mode="inline"
        :items="formattedItems"
        :style="{ maxHeight: isMenuOpen ? '400px' : '0' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { MenuProps } from 'ant-design-vue'
import data from '../assets/data.json'
import { useSettingsStore } from '@/stores/useSettingsStore'

const store = useSettingsStore()
const theme = computed(() => store.theme)
const isMobile = ref(false)
const isMenuOpen = ref(false)
const current = ref<string[]>(['home'])
const personal = ref(data.personal)

// 原始导航项转换
const navItems = [
  { key: 'home', label: '主页', link: '/' },
  { key: 'books', label: '阅读书目', link: '/books' },
  { key: 'game', label: '贪吃蛇游戏', link: '/game' },
  { key: 'wordcloud', label: '词云', link: '/wordcloud' }
]

// 转换为 Ant Design 需要的格式
const formattedItems = computed<MenuProps['items']>(() => {
  return navItems.map(item => ({
    key: item.key,
    label: h('a', { href: item.link }, item.label),
    class: item.key === current.value[0] ? 'selected' : '',
    onClick: () => handleNavClick(item.key)
  }))
})

// 响应式检测
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// 导航点击处理
const handleNavClick = (key: string) => {
  current.value = [key]
  isMenuOpen.value = false
}

// 菜单切换
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 主题切换
const toggleTheme = () => {
  store.toggleTheme()
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>

<style scoped>
/* 基础布局 */
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
  background: white;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* 主题切换按钮 */
.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

/* 桌面菜单样式 */
:deep(.desktop-menu.ant-menu-horizontal) {
  border-bottom: none;
  line-height: 1;
  background: transparent;
}

:deep(.desktop-menu .ant-menu-item) {
  padding: 0 1.2rem !important;
  height: auto !important;
  line-height: 1.5;
  border-radius: 4px;
  transition: all 0.2s;
}

:deep(.desktop-menu .ant-menu-item a) {
  color: #444;
  font-size: 1.1rem;
}

:deep(.desktop-menu .ant-menu-item-selected) {
  background: rgba(119, 14, 28, 0.1) !important;
}

:deep(.desktop-menu .ant-menu-item:hover) {
  background: #770e1c !important;
}

:deep(.desktop-menu .ant-menu-item:hover a) {
  color: white !important;
}

/* 移动端菜单样式 */
.mobile-menu {
  display: none;
}

/* 汉堡菜单优化 */
.hamb {
  display: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1000;
}

.hamb-line {
  display: block;
  width: 24px;
  height: 2px;
  background: #444;
  margin: 5px 0;
  transition: all 0.3s;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-menu {
    display: none !important;
  }

  .mobile-menu {
    display: block;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 999;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }

  :deep(.mobile-menu .ant-menu-item) {
    padding: 1rem 2rem !important;
    margin: 0 !important;
  }

  :deep(.mobile-menu .ant-menu-item:hover) {
    background: #f5f5f5 !important;
  }

  .hamb {
    display: block;
  }

  /* 汉堡菜单动画 */
  .hamb.active .hamb-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamb.active .hamb-line:nth-child(2) {
    opacity: 0;
  }

  .hamb.active .hamb-line:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
}

/* 字体样式保持原样 */
.webfont2 {
  font-family: 'my-web-font2' !important;
  font-size: 1.4rem;
  letter-spacing: 0.05em;
}
</style>