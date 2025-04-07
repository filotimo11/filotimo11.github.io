// wordcloud.js
const CONFIG = {
    fontScale: 1.2,
    colors: [
        '#770e1c',    
        '#9b2d3a',    
        '#ffd700',    
        '#5a0a16',    
        '#a463f2'     
    ],
    padding: 3,
    rotate: () => (~~(Math.random() * 4) - 2) * 20,
    fontFamily: 'my-web-font2'
};

function initWordCloud() {
    const container = document.getElementById('word-cloud');
    const width = container.clientWidth - 30;
    const height = container.clientHeight - 30;

    const svg = d3.select("#word-cloud")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("font-family", CONFIG.fontFamily)
        .attr("text-anchor", "middle")
        .style("background", "linear-gradient(145deg, #fff8fa 0%, #fff5f7 100%)");

    const layout = d3.layout.cloud()
        .size([width * 0.98, height * 0.98])
        .words(wordsData.map(d => ({
            text: d.text,
            size: d.size * 1.2  
        })))
        .padding(CONFIG.padding)
        .rotate(CONFIG.rotate)
        .fontSize(d => d.size * CONFIG.fontScale)
        .on("end", draw);

    layout.start();

    function draw(words) {
        const centerX = width / 2;
        const centerY = height / 2;

        svg.append("g")
            .attr("transform", `translate(${centerX},${centerY})`)
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", d => `${d.size}px`)
            .style("fill", () => CONFIG.colors[Math.random() * CONFIG.colors.length | 0])
            .style("cursor", "pointer")
            .style("fill-opacity", 0)
            .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
            .text(d => d.text)
            .transition()
            .duration(800)
            .style("fill-opacity", 1)
    }

    window.addEventListener('resize', () => {
        d3.select("#word-cloud svg").remove();
        initWordCloud();
    });
}

document.addEventListener('DOMContentLoaded', initWordCloud);