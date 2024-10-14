const fs = require('fs')
const sharp = require('sharp')

const input = 'scripts/00_Originals'
const output = 'scripts/outputs'
const subpaths = {
  img: ['01_Primary-Text', '04_Interviews'],
  visualEssay: ['02_Blue-Insights', '03_Surface-Manipulation'],
}


const joinPaths = (...subpaths) => subpaths.join('/')
const createSizes = (length, interval) => Array(length).fill(interval).map((size, i) => size * (1 + i))
const imgSizes = createSizes(5, 150)
const visualEssaySizes = createSizes(8, 125)

fs.rmSync(output, { recursive: true })
fs.mkdirSync(output)

const resizeGroup = (subpaths, sizes) => {
  subpaths.forEach(subpath => {
    const inputPath = joinPaths(input, subpath)
    const dir = fs.readdirSync(inputPath)
    const outputPath = joinPaths(output, subpath)
    fs.mkdirSync(outputPath)
    sizes.forEach(size => {
      const sizeDir = joinPaths(outputPath, size)
      fs.mkdirSync(sizeDir)
      dir.forEach(fileName => {
        if (!fileName.match(/\.tif$/)) return
        const img = sharp(joinPaths(inputPath, fileName))
        img
          .webp()
          .resize(size)
          .toFile(joinPaths(sizeDir, fileName.replace(/tif$/, 'webp')), () => console.log(size, fileName))
      })
    })
  })
}
resizeGroup(subpaths.img, imgSizes)
resizeGroup(subpaths.visualEssay, visualEssaySizes)