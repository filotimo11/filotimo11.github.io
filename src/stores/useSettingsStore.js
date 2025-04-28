// stores/useSettingsStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // 主题状态
  const theme = ref(localStorage.getItem('theme') || 'light')

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    applyTheme()
  }

  // 应用主题样式
  const applyTheme = () => {
    const html = document.documentElement
    theme.value === 'dark' 
      ? html.classList.add('dark')
      : html.classList.remove('dark')
  }

  // 初始化时应用主题
  applyTheme()

  return { theme, toggleTheme }
})