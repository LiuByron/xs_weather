const fs = require('fs');
const path = require('path');
const cors = require('cors');
const xlsx = require('node-xlsx');
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();
const axios = require('axios');
const express = require('express');
const app = express();

// 全局配置跨域
app.use(cors());
app.post('/upload', multipartyMiddleware, (req, res) => {
    if (req.files === null) {
        return res.status(400).json({
            msg: 'no file uploaded'
        });
    }
    const file = req.files.file;
    res.status(200).send({
        fileName: file.name,
        filePath: `uploads/${file.name}`
    })
});

// excel导出下载模板接口
app.get("/exportExcel", async(req, res) => {
    const xl = fs.readFileSync(path.join(__dirname, "xs.xlsx"));
    const dataByParse = xlsx.parse(xl, 'utf-8');
    const _data = dataByParse[0].data;
    const requestList = [];
    _data.forEach((item, index) => {
        if (index !== 0) {
            requestList.push(axios.get(`http://www.weather.com.cn/data/sk/${item[0]}.html`));
        }
    })
    const result = await Promise.all(requestList);
    result.forEach((item, index) => {
        const _temp = item.data.weatherinfo.temp;
        _data[index + 1][2] = _temp;
    })
    dataByParse[0].data = _data;
    res.send(xlsx.build(dataByParse))
});

app.listen(3000, () => {
    console.log('Server started...')
});