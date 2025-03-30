// xlsx-convert.js
const XLSX = require('xlsx');
const fs = require('fs');

const config = {
    inputFile: process.argv[2] || 'word.xlsx',
    outputFile: process.argv[3] || 'words-data.js',
    textColumn: '词组',
    frequencyColumn: '词频',
    minSize: 12,
    maxSize: 65,
    curveFactor: 0.55,
    maxWords: 180
};

try {
    if (!fs.existsSync(config.inputFile)) {
        throw new Error(`输入文件不存在: ${config.inputFile}`);
    }

    const workbook = XLSX.readFile(config.inputFile);
    if (workbook.SheetNames.length === 0) {
        throw new Error('Excel文件中没有有效的工作表');
    }

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    
    const validData = rawData.filter(item => 
        item[config.textColumn] && 
        !isNaN(item[config.frequencyColumn]) &&
        item[config.frequencyColumn] > 0
    );

    if (validData.length === 0) {
        throw new Error('有效数据为空，请检查数据列');
    }

    const frequencies = validData.map(d => parseInt(d[config.frequencyColumn]));
    const [minFreq, maxFreq] = [Math.min(...frequencies), Math.max(...frequencies)];

    const sizeMapper = (freq) => {
        const logMin = Math.log(minFreq + 1);
        const logMax = Math.log(maxFreq + 1);
        const normalized = (Math.log(freq + 1) - logMin) / (logMax - logMin);
        const curved = Math.pow(normalized, config.curveFactor);
        return Math.round(
            config.minSize + 
            curved * (config.maxSize - config.minSize) * 0.85
        );
    };

    const processedData = validData
        .map(item => ({
            text: item[config.textColumn].toString().trim(),
            size: sizeMapper(parseInt(item[config.frequencyColumn])),
            rawFrequency: parseInt(item[config.frequencyColumn])
        }))
        .filter(d => d.size >= config.minSize)
        .sort((a, b) => b.rawFrequency - a.rawFrequency)
        .slice(0, config.maxWords);

    const jsContent = `/**
* 词云数据生成规则：
* - 字号范围: ${config.minSize}-${config.maxSize}px
* - 非线性系数: ${config.curveFactor}
* - 最大显示词汇: ${config.maxWords}
* - 原始数据量: ${rawData.length}
* 生成时间: ${new Date().toLocaleString()}
*/
const wordsData = ${JSON.stringify(processedData, null, 2)};`;
    
    fs.writeFileSync(config.outputFile, jsContent, 'utf8');

    console.log(`
▓ 转换成功 ▓
输入文件: ${config.inputFile}
输出文件: ${config.outputFile}
有效词汇: ${processedData.length} 个 (过滤 ${rawData.length - processedData.length} 个无效项)
词频范围: ${minFreq} ~ ${maxFreq}
字体范围: ${config.minSize}px ~ ${config.maxSize}px
显示词数: ${config.maxWords}
非线性系数: ${config.curveFactor}
    `);

} catch (error) {
    console.error('▓ 错误 ▓', error.message);
    process.exit(1);
}