'use strict'
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

//const inputFile = 'src/**/*.js';
const inputFile = 'src/**/*.js';
const outputDir = __dirname;

const BASE_URL = 'http://blacksmith2d.io/Docs/API/';

//const OUTPUT_PATH_PREFIX = path.resolve(outputDir, './../docs/');
const OUTPUT_PATH_PREFIX = 'd:\\MassiveHeights.Blacksmith\\blacksmith2d.io\\Blacksmith.Homepage\\App_Data\\tmp-docs-repo\\src\\API\\';

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

class Generator {
  setTemplateData(data) {
    this.data = data;
  }

  renderClass(item) { 
    let text = '';
    text += item.identifier.description + '\n';
    text += this.renderExtends(item) + '\n';

    text += this.renderMethodList(item);
    text += this.renderPropertyList(item);

    text += this.renderMethods(item);
    text += this.renderProperties(item);

    let className = item.name;
    let cat = item.cat;

    let filepath = `${OUTPUT_PATH_PREFIX}${className}.md`;

    if (cat) {
      cat = cat.replace(/\./g, '/');
      filepath = `${OUTPUT_PATH_PREFIX}${cat}/${className}.md`;
    }

    ensureDirectoryExistence(filepath);

    fs.writeFileSync(filepath, text);
  }

  renderModuleList() {
    let cats = {};

    this.data.forEach(x => {
      if (x.ignore)
        return;
      
      if (x.kind != 'class')
        return;
      
      let cat = this.getTypeCat(x);
      if (!cat)
        return;  
      
      if (!(cat in cats))
        cats[cat] = [];
      
      cats[cat].push(x);
    });

    
    for (var p in cats) {
      let cat = p.replace(/\./g, '/');      
      let fnames = cat.split('/');
      let fname = fnames[fnames.length - 1];

      
      let text = '';

      //text += '<h2>Classes</h2>'

      for (let i = 0; i < cats[p].length; i++) {
        let item = cats[p][i];

        let name = item.name;
        
        text += '\n';

        let url = `${BASE_URL}${cat}/${name}`;
        text += `<a href="${url}" class="method-name">${name}</a>`;
      }

      text += '\n';

      let filepath = path.resolve(outputDir, `${OUTPUT_PATH_PREFIX}${cat}/${fname}.md`);
      ensureDirectoryExistence(filepath);
      fs.writeFileSync(filepath, text);
    }    
  }

  renderExtends(item) {
    let id = item.identifier;
    if (!id.augments)
      return '';

    if (id.augments.length === 0)
      return '';

    let text = '<div class=""><b>Extends:</b> ';
    for (var i = 0; i < id.augments.length; i++) {
      var element = id.augments[i];

      text += element;

      if (i != id.augments.length - 1)
        text += ', ';
    }

    return text + '</div>\n';
  }

  renderMethods(item) {
    let text = '';    

    this.data.forEach(x => {
      if (x.ignore)
        return;

      var access = '';

      if (x.access) {
        if (x.access != 'public' && x.access != 'protected' && x.access != 'static')
          return;
      } else {
        if (x.scope)
          access = x.scope;

        if (access == 'instance')
          access = '';
      }

      if (x.memberof == item.name && (x.kind == 'function' || x.kind == 'constructor')) {
        text += '\n<div class="method-info">\n';
        let name = x.name;
        let sscope = '';

        if (x.scope && x.scope == 'static')
          sscope = '<span class="method-static">static</span>';        

        if (x.kind == 'constructor') {
          let skind = '<span class="id-kind-method">constructor</span>';
          text += `<a name="${name}"></a>\n<h3>${sscope}${name}(${this.genParams(x)}) ${skind}</h3>\n`;
        }
        else {
          let skind = '<span class="id-kind-method">method</span>';
          text += `<a name="${name}"></a>\n<h3>${sscope}${name}(${this.genParams(x)}) ${skind}</h3>\n`;
        }

        text += `${this.getDesc(x)}\n`;

        //let pstr = this.genParamTypes(x);
        text += '\n';
        //text += '#### Syntax\n';
        text += `${this.renderParamsFull(item, x)}\n`;
        text += this.renderReturn(item, x);
        text += '\n</div>\n';
      }
    });

    return text;
  }

  renderReturn(classItem, item) {
    let text = '';

    if (!item.returns)
      return '';
    
    if (item.returns.length == 0)
      return '';
    
    text += `<span class="doc-returns">Returns</span>`;
    
    var r = item.returns[0];

    for (var k = 0; k < r.type.names.length; k++) {
      var element = r.type.names[k];
      
      text += this.renderType(classItem, element);

      if (k != r.type.names.length - 1)
        text += ' | ';
    }      

    if (r.description)
      text += ` — ${r.description}`;

    return text;
  }

  renderProperties(item) {
    let text = '';
    let skind = '<span class="id-kind-property">property</span>';

    this.data.forEach(x => {
      if (x.ignore)
        return;

      var access = '';

      if (x.access) {
        if (x.access != 'public' && x.access != 'protected' && x.access != 'static')
          return;
      } else {
        if (x.scope)
          access = x.scope;

        if (access == 'instance')
          access = '';
      }      

      if (x.memberof == item.name && (x.kind == 'member')) {

        // if (x.name == "path")
        //   console.log(x);
          
        text += '\n<div class="method-info">\n';
        let name = x.name;

        //console.log(x);
        let sscope = '';

        if (x.scope && x.scope == 'static')
          sscope = '<span class="method-static">static</span>';

        text += `<a name="${name}"></a>\n<h3>${name} ${skind}</h3>\n`;
        text += `${sscope}`;
        text += `${this.getDesc(x)}\n`;

        text += this.renderReturn(item, x);
        
        text += '\n</div>\n';
      }
    });

    return text;
  }

  renderParamsFull(classItem, item) {
    let access = item.access;
    if (!access)
      access = 'public';

    if (item.params.length == 0)
      return '';

    let text = '<table>\n';
    text += '<tr>\n';
    text += '<th>Parameter</th>\n';
    text += '<th>Type</th>\n';
    text += '<th>Required</th>\n';
    text += '<th>Default</th>\n';
    text += '<th>Description</th>\n';
    text += '</tr>\n';

    //text += '| Parameter | Required | Default | Description |\n';
    //text += '| --- | --- | --- | --- |\n';

    for (var i = 0; i < item.params.length; i++) {
      text += '<tr>\n';
      var element = item.params[i];

      text += `<td>${element.name}</td>\n`;

      let typeName = '';
      for (var k = 0; k < element.type.names.length; k++) {
        var type = element.type.names[k];

        typeName += `${type}`;
        if (k != element.type.names.length - 1)
          typeName += ' | ';
      }

      let required = element.optional != null && element.optional == true ? 'false' : 'true';
      let def = element.defaultvalue != null ? element.defaultvalue : '-';

      text += `<td>${this.renderType(classItem, typeName)}</td>\n`;
      text += `<td>${required}</td>\n`;
      text += `<td>${def}</td>\n`;
      text += `<td>${this.getDesc(element)}</td>\n`;

      text += '</tr>\n';
    }

    text += '</table>\n';
    return text;
    // if (item.kind == 'constructor')    
    //   return `<code>new ${item.name}(${this.renderParamsFull(item)})</code>`;
    // else
    //return `<code>${item.name}(${this.renderParamsFull(item)})</code>`;  
  }

  renderType(classItem, name) {
    if (name == 'boolean' || name == 'number')
      return name;

    // build url using category
    // TODO: handle template types like Array<Component>
    
    let t = this.getTypeInfo(name);
    if (t) {
      let cc = this.getTypeCat(t);

      let url = `${BASE_URL}${cc.replace('.', '/')}/${name}`;
      return `<a href="${url}">${name}</a>`;
    }

    return name;
  }

  getTypeInfo(name) {
    let ret = null;
    this.data.forEach(x => {
      if (x.longname == name && x.kind == 'class') {
        ret = x;
        return;
      }
    });

    return ret;
  }

  getTypeCat(type) {
    if (!type.customTags)
      return null;

    for (var i = 0; i < type.customTags.length; i++) {
      var e = type.customTags[i];
      if (e.tag == 'cat')
        return e.value;
    }

    return null;
  }

  renderHref(x, title) {

    let url = '#pivotX';
    return `<a href="${url}">${title}</a>`;
  }

  renderMethodList(item) {
    let text = '';

    text += '<h2>Methods</h2>'

    this.data.forEach(x => {
      if (x.ignore)
        return;

      var access = '';

      if (x.access) {
        if (x.access != 'public' && x.access != 'protected' && x.access != 'static')
          return;
      } else {
        if (x.scope)
          access = x.scope;

        if (access == 'instance')
          access = '';
      }

      if (x.memberof == item.name && (x.kind == 'function' || x.kind == 'constructor')) {
        let name = x.name;
        let pstr = this.genParamTypes(x);

        if (x.kind == 'constructor')
          text += `<a href="#${name}" class="method-name">constructor</a>`;
        else
          text += `<a href="#${name}" class="method-name">${name}</a>`;

      }
    });

    return text;
  }


  renderPropertyList(item) {
    let text = '';

    text += '<h2>Properties</h2>'

    this.data.forEach(x => {
      if (x.ignore)
        return;

      var access = '';

      if (x.access) {
        if (x.access != 'public' && x.access != 'protected' && x.access != 'static')
          return;
      } else {
        if (x.scope)
          access = x.scope;

        if (access == 'instance')
          access = '';
      }

      if (x.memberof == item.name && (x.kind == 'member')) {
        let name = x.name;

        text += `<a href="#${name}" class="method-name">${name}</a>`;
        //text += '| ' + access + ' ' + this.renderHref(x, name) + ' | ' + this.getShortDesc(x) + ' |\n';
      }
    });

    return text;
  }

  renderMethodList2(item) {
    let text = '';

    text += '\n<div class="doc-info">\n';
    text += '<h2>Methods</h2>'

    text += '<table>\n';
    text += '<tr>\n';
    text += '<th>Name</th>\n';
    text += '<th>Description</th>\n';
    text += '</tr>\n';

    this.data.forEach(x => {
      if (x.ignore)
        return;

      var access = '';

      if (x.access) {
        if (x.access != 'public' && x.access != 'protected' && x.access != 'static')
          return;
      } else {
        if (x.scope)
          access = x.scope;

        if (access == 'instance')
          access = '';
      }

      if (x.memberof == item.name && (x.kind == 'function' || x.kind == 'constructor')) {
        text += '<tr>';

        let name = x.name;
        let pstr = this.genParamTypes(x);

        if (x.kind == 'constructor')
          text += `<td>new ${name}(${pstr})</td>`;
        else
          text += `<td>${name}(${pstr})</td>`;

        text += `<td>${this.getShortDesc(x)}</td>`;

        text += '</tr>';
      }
    });

    text += '</table>\n'
    text += '</div>\n'

    return text;
  }

  getDesc(item) {
    if (!item)
      return '-';

    if (!item.description)
      return '-';

    if (item.description == 'undefined')
      return '-';

    if (item.description == 'Description')
      return '-';

    return item.description;
  }

  getShortDesc(item) {
    if (!item)
      return '-';

    if (!item.description)
      return '-';

    if (item.description == 'Description')
      return '-';

    let ix = item.description.indexOf('\r');
    if (ix > 0)
      return item.description.substr(0, ix);

    return item.description;
  }

  genParamTypes(item) {
    let text = '';
    for (var i = 0; i < item.params.length; i++) {
      var element = item.params[i];

      for (var k = 0; k < element.type.names.length; k++) {
        var name = element.type.names[k];
        text += name;

        if (k != element.type.names.length - 1)
          text += ' | ';
      }

      if (i != item.params.length - 1)
        text += ', ';

    }
    return text;
  }

  genParams(item) {
    let text = '';
    for (var i = 0; i < item.params.length; i++) {
      var element = item.params[i];

      text += element.name;

      if (i != item.params.length - 1)
        text += ', ';

    }
    return text;
  }



}

const templateData = jsdoc2md.getTemplateDataSync({
  files: inputFile
});

let g = new Generator();
g.setTemplateData(templateData)

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const classNames = [];

for (var i = 0; i < templateData.length; i++) {
  var identifier = templateData[i];
  var cat = null;

  if (identifier.kind === 'class') {
    if (identifier.customTags && identifier.customTags.length) {
      for (let i = 0; i < identifier.customTags.length; i++) {
        let t = identifier.customTags[i];

        if (t['tag'] === 'cat')
          cat = t['value'];
      }
    }

    classNames.push({
      name: identifier.name,
      cat: cat,
      identifier: identifier
    })
  }
}

for (const item of classNames) {
  g.renderClass(item);
  g.renderModuleList();
}