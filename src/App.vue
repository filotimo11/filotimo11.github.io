<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style> 
:root {
  /* 明亮主题变量 */
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #770e1c;
}

.dark {
  /* 黑暗主题变量 */
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
  --primary-color: #ff6b6b;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

/* 示例组件样式适配 */
.theme-card {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--primary-color);
}</style>