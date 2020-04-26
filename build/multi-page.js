/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/7/20
 * ======================================== */

// webpack构建的多页应用配置
const path = require('path')
const util = require('./utils')
const projectName = require('../package.json').name
const pages = {}

const getHtmlFile = function (pageName) {
    let fileName = `${projectName}/${pageName}/index.html`
    switch (pageName){
        case 'administrator':
            fileName = 'index.html'
            break
    }

    return fileName
}

util.getPageFiles().forEach(filepath => {
    let pageName = path.basename(path.dirname(filepath))
    pages[pageName] = {
        entry:filepath,
        title:'禅道工具',
        filename: getHtmlFile(pageName),
        // chunks:['vue_jquery',pageName]
    }
})

module.exports = pages
