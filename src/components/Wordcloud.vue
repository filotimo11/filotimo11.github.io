<template>
    <div class="wordcloud-container webfont2">
        <h2>词云展示</h2>
        <div id="llm-word-cloud"></div>
        <div class="tooltip" :style="tooltipStyle">{{ tooltipContent }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as d3 from 'd3'
import cloud from 'd3-cloud'
import wordsData from '../assets/wordData.json'

// 响应式状态
const tooltipContent = ref('')
const tooltipStyle = ref({
    opacity: 0,
    transform: 'translate(-50%, -110%) scale(0.95)'
})

// D3相关方法
const initWordCloud = () => {
    const container = document.getElementById('llm-word-cloud')
    if (!container?.clientWidth || !container?.clientHeight) return

    const width = container.clientWidth - 30
    const height = container.clientHeight - 30

    const svg = d3.select("#llm-word-cloud")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("font-family", 'Arial')
        .attr("text-anchor", "middle")
        .style("background", "linear-gradient(145deg, #fff8fa 0%, #fff5f7 100%)")

    const layout = cloud()
        .size([width * 0.98, height * 0.98])
        .words(wordsData.map(d => ({
            text: d.text,
            size: d.size * 1.2,
            rawFrequency: d.rawFrequency
        })))
        .padding(5)
        .rotate(() => (~~(Math.random() * 6) - 3) * 10)
        .fontSize(d => d.size)
        .on("end", draw)

    layout.start()
}

const draw = (words) => {
    const container = document.getElementById('llm-word-cloud')
    const width = container.clientWidth - 30
    const height = container.clientHeight - 30
    const centerX = width / 2
    const centerY = height / 2

    const texts = d3.select("#llm-word-cloud svg")
        .append("g")
        .attr("transform", `translate(${centerX},${centerY})`)
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => `${d.size}px`)
        .style("fill", () => ['#770e1c', '#9b2d3a', '#ffd700', '#5a0a16', '#a463f2'][Math.floor(Math.random() * 5)])
        .style("cursor", "pointer")
        .style("fill-opacity", 0)
        .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text(d => d.text)
        .on("mouseover", (event, d) => {
            tooltipContent.value = `<strong>${d.text}</strong><br>出现次数：${d.rawFrequency}`
            tooltipStyle.value = {
                opacity: 1,
                transform: `translate(${event.pageX}px, ${event.pageY - 20}px) scale(1)`
            }
        })
        .on("mouseout", () => {
            tooltipStyle.value = {
                opacity: 0,
                transform: 'translate(-50%, -110%) scale(0.95)'
            }
        })

    texts.transition()
        .duration(800)
        .style("fill-opacity", 1)
}

const handleResize = () => {
    d3.select("#llm-word-cloud svg").remove()
    initWordCloud()
}

// 生命周期钩子
onMounted(() => {
    initWordCloud()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    d3.select("#llm-word-cloud svg").remove()
})
</script>

<style scoped>
.wordcloud-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 30px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(119, 14, 28, 0.1);
    border: 1px solid #ffe6eb;
    position: relative;
}

.wordcloud-container h2 {
    color: #770e1c;
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 30px;
    position: relative;
}

#llm-word-cloud {
    width: 100%;
    height: 70vh;
    min-height: 500px;
    background: linear-gradient(145deg, #fff8fa 0%, #fff5f7 100%);
    border-radius: 12px;
    margin: 20px 0;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

#llm-word-cloud:hover {
    box-shadow: inset 0 0 15px rgba(119, 14, 28, 0.1);
}

.tooltip {
    position: fixed;
    padding: 12px 18px;
    background: linear-gradient(145deg, rgba(119, 14, 28, 0.95), rgba(90, 10, 22, 0.95));
    color: #fff;
    border-radius: 8px;
    font-family: 'my-web-font2';
    font-size: 14px;
    line-height: 1.5;
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 15px rgba(119, 14, 28, 0.2);
    border: 1px solid #ffd700;
    max-width: 300px;
    z-index: 9999;
}

.tooltip::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 12px;
    height: 12px;
    background: linear-gradient(145deg, rgba(119, 14, 28, 0.95), rgba(90, 10, 22, 0.95));
    transform: translateX(-50%) rotate(45deg);
}

.tooltip strong {
    display: block;
    margin-bottom: 4px;
    color: #ffd700;
    font-size: 1.1em;
}

.theme-tag {
    font-size: 1.2rem;
    background: #770e1c;
    color: white;
    padding: 2px 10px;
    border-radius: 15px;
    vertical-align: middle;
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