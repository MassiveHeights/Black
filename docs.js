'use strict'
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

const inputFile = 'src/**/*.js';
const outputDir = __dirname;

const templateData = jsdoc2md.getTemplateDataSync({
  files: inputFile
})

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const classNames = templateData.reduce((classNames, identifier) => {  
  if (identifier.kind === 'class') {
    let cat = null;

    if (identifier.customTags && identifier.customTags.length) {
      for (let i = 0; i < identifier.customTags.length; i++) {
        let t = identifier.customTags[i];

        if (t['tag'] === 'cat')
          cat = t['value'];
      }
    }
    //console.log(cat);
    classNames.push({ name: identifier.name, cat: cat });    
  }

  return classNames;
}, []);

for (const item of classNames) {
  let className = item.name;
  let cat = item.cat;

  const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
  console.log(`rendering ${className}`);
  
  const output = jsdoc2md.renderSync({
    data: templateData,
    template: template
  })

  let filepath = path.resolve(outputDir, `docs/${className}.md`);

  if (cat)
    filepath = path.resolve(outputDir, `docs/${cat}/${className}.md`);  

  ensureDirectoryExistence(filepath);
  fs.writeFileSync(filepath, output)
}