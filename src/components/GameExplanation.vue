<template>
  <div class="game-explanation webfont2">
    <div class="explanation-section">
      <h3 class="explanation-title">📖 江湖指南</h3>
      <div v-for="item in explanationItems" :key="item.icon" class="explanation-item">
        <span class="explanation-icon">{{ item.icon }}</span>
        <div class="explanation-text">
          <strong>{{ item.title }}</strong>
          <small v-if="item.subtitle">{{ item.subtitle }}</small>
          <ul v-if="item.list" class="difficulty-list">
            <li v-for="(difficulty, index) in difficultyOptions" :key="index">
              <span :style="{ color: '#770e1c' }">{{ difficulty.label }}</span> - {{ difficulty.desc }}
            </li>
          </ul>
          <div v-if="item.grid" class="item-grid">
            <div v-for="(gridItem, idx) in gameItems" :key="idx" :class="['item-card', gridItem.type]">
              <i :class="['fas', `fa-${gridItem.icon}`]"></i>
              <span>{{ gridItem.name }}</span>
              <small>{{ gridItem.desc }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { difficultyOptions, gameItems } from '../assets/gameData.json'

// 说明项配置
const explanationItems = ref([
  {
    icon: '🔄',
    title: '身法效率：平均每增长1节长度需要的转向次数',
    subtitle: '数值越低说明操作越精准'
  },
  {
    icon: '⏸️',
    title: '暂停/继续：按空格键或P键可随时暂停修炼',
    subtitle: '暂停期间江湖时间停止流动'
  },
  {
    icon: '⚔️',
    title: '修炼难度',
    list: true,  // 触发难度列表渲染
    items: difficultyOptions.map(option => ({
      label: option.name,
      description: option.description
    }))
  },
  {
    icon: '🎁',
    title: '江湖奇物',
    grid: true,  // 触发道具网格渲染
    items: gameItems.map(item => ({
      icon: item.icon,
      name: item.name,
      effect: item.effect
    }))
  }
])

// 响应式状态
const showDifficulty = ref(false)
const selectedDifficulty = ref(100)

// 方法定义
const toggleDifficulty = () => {
  showDifficulty.value = !showDifficulty.value
}

const handleDifficultySelect = (value) => {
  selectedDifficulty.value = value
  toggleDifficulty()
}
</script>