'use strict'
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

//const inputFile = 'src/**/*.js';
const inputFile = 'src/**/*.js';
const outputDir = __dirname;

//const BASE_URL = 'http://blacksmith2d.io/Docs/API/';
const BASE_URL = '/Docs/API/';

const OUTPUT_PATH_PREFIX = path.resolve(outputDir, './../docs/') + '/';
//const OUTPUT_PATH_PREFIX = 'D:\\Projects\\Massive Heights\\blacksmith2d.io.web\\Blacksmith.Homepage\\App_Data\\tmp-docs-repo\\src\\API\\';

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function rmDir(dirPath) {
  try { var files = fs.readdirSync(dirPath); }
  catch (e) { return; }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        rmDir(filePath);
    }
  fs.rmdirSync(dirPath);
};

class Generator {
  setTemplateData(data) {
    this.data = data;
  }

  renderClass(item) {
    let text = '';

    let kind = item.identifier.kind.charAt(0).toUpperCase() + item.identifier.kind.slice(1);
    let extendsString = this.renderExtends(item);

    text += `<h1><span style="color: #999">${kind}</span> ${item.identifier.name} ${extendsString}</h1>\n`;

    text += this.parseCodeTag(item.identifier.description) + '\n';

    if (item.identifier.kind === 'class') {
      //text += this.renderExtends(item) + '\n';

      text += this.renderMethodList(item, 'Methods', x => !x.inherited && x.scope !== 'static');
      text += this.renderMethodList(item, 'Inherited methods', x => x.inherited === true && x.scope !== 'static');
      text += this.renderMethodList(item, 'Static methods', x => x.scope === 'static');
      text += this.renderPropertyList(item, 'Properties', x => !x.inherited && x.scope !== 'static');
      text += this.renderPropertyList(item, 'Inherited properties', x => x.inherited === true && x.scope !== 'static');
      text += this.renderPropertyList(item, 'Static properties', x => x.scope === 'static');

      text += this.renderMethods(item);
      text += this.renderProperties(item);
    } else if (item.identifier.kind === 'enum') {
      text += this.renderEnum(item);
    }

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


  renderExtends(item) {
    let id = item.identifier;
    if (!id.augments)
      return '';

    if (id.augments.length === 0)
      return '';

    let text = '<span style="color: #999">extends </span>';
    for (var i = 0; i < id.augments.length; i++) {
      var element = id.augments[i];
      text += `<a href="${this.getClassPath(element)}" class="method-name">${element}</a>`;

      if (i != id.augments.length - 1)
        text += ', ';
    }

    return text + '\n';
  }

  renderEnum(item) {
    item = item.identifier;
    let access = item.access;
    if (!access)
      access = 'public';

    if (access == 'private')
      return '';


    if (item.properties.length == 0)
      return '';

    let text = '<table class="enum-table">\n';
    text += '<tr>\n';
    text += '<th>Name</th>\n';
    text += '<th>Description</th>\n';
    text += '</tr>\n';

    for (var i = 0; i < item.properties.length; i++) {
      text += '<tr>\n';
      var element = item.properties[i];

      text += `<td>${element.name}</td>\n`;

      text += `<td>${this.getDesc(element, true)}</td>\n`;

      text += '</tr>\n';
    }

    text += '</table>\n';
    return text;
  }

  renderModuleList() {
    let cats = {};

    this.data.forEach(x => {
      if (x.ignore)
        return;

      if (x.kind !== 'class' && x.kind !== 'enum')
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

      text += `<h2>${cat}</h2>`;

      for (let i = 0; i < cats[p].length; i++) {
        let item = cats[p][i];

        let name = item.name;

        text += '\n';

        let url = `${BASE_URL}${cat}/${name}`;
        text += `<a href="${url}" class="method-name">${name}</a>`;
      }

      text += '\n';

      let filepath = path.resolve(outputDir, `${OUTPUT_PATH_PREFIX}${cat}/README.md`);
      ensureDirectoryExistence(filepath);
      fs.writeFileSync(filepath, text);
    }
  }

  seekClass(className) {
    for (let i = 0; i < this.data.length; i++) {
      let item = this.data[i];
      if (item.longname === className && item.kind === 'class') {
        return item;
      }
    }
    return null;
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
        let sabstract = '';

        if (x.scope && x.scope == 'static')
          sscope = '<span class="method-static">static</span>';

        if (x.virtual === true && !x.inherited)
          sabstract = '<span class="method-static">abstract</span>';

        if (x.inherited)
          text += '<span class="method-static">inherited</span>';

        if (x.override || x.overrides != null)
          text += '<span class="method-static">overridden</span>';

        if (x.kind == 'constructor') {
          let skind = '<span class="id-kind-method">constructor</span>';
          text += `<a name="${name}"></a>\n<h3>new ${sscope}${name}(${this.genParams(x)}) ${skind}</h3>\n`;
        }
        else {
          let skind = '<span class="id-kind-method">method</span>';
          text += `<a name="${name}"></a>\n<h3>${sscope}${name}(${this.genParams(x)}) ${skind}</h3>\n`;
        }

        text += `${this.getDesc(x)}\n`;

        //let pstr = this.genParamTypes(x);
        text += '<br />\n';
        //text += '#### Syntax\n';
        text += `${this.renderParamsFull(item, x)}`;
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

    let str = item.kind === 'member' ? 'Type:' : 'Returns:';
    text += `<span class="doc-returns">${str}</span> <span class="doc-returns-type">`;

    var r = item.returns[0];

    for (var k = 0; k < r.type.names.length; k++) {
      var element = r.type.names[k];

      text += this.renderType(classItem, element);

      if (k != r.type.names.length - 1)
        text += ' | ';
    }

    if (r.description)
      text += ` — ${r.description}`;

    text += '</span>';

    return text;
  }

  renderProperties(item) {
    let text = '';
    let skind = '<span class="id-kind-property">property</span>';

    this.data.forEach(x => {
      if (x.ignore)
        return;

      let access = '';

      if (x.access) {
        // if (x.access != 'public' && x.access != 'protected' && x.access != 'static')
        if (x.access != 'public' && x.access != 'static')
          return;
      } else {
        if (x.scope)
          access = x.scope;

        if (access == 'instance')
          access = '';
      }

      if (x.memberof == item.name && (x.kind == 'member' || x.kind == 'constant')) {

        text += '\n<div class="method-info">\n';
        let name = x.name;

        let sscope = '';

        if (x.scope && x.scope == 'static')
          sscope = '<span class="method-static">static</span>';

        if (x.inherited)
          text += '<span class="method-static">inherited</span>';

        if (x.override)
          text += '<span class="method-static">overridden</span>';

        text += `<a name="${name}"></a>\n<h3>${sscope}${name} ${skind}</h3>\n`;

        text += `${this.getDesc(x)}<br />\n`;

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
    //text += '<th>Required</th>\n';
    text += '<th>Default</th>\n';
    text += '<th>Description</th>\n';
    text += '</tr>\n';

    //text += '| Parameter | Required | Default | Description |\n';
    //text += '| --- | --- | --- | --- |\n';

    for (let i = 0; i < item.params.length; i++) {
      text += '<tr>\n';
      let element = item.params[i];

      text += `<td>${element.name}</td>\n`;

      if (!element.type) {
        console.log('no type for: ' + element.name);
        return text;
      }

      let typeName = '';
      for (let k = 0; k < element.type.names.length; k++) {
        let type = element.type.names[k];

        typeName += `${type.replace('<', '&lt').replace('>', '&gt')}`;
        if (k != element.type.names.length - 1)
          typeName += ' | ';
      }

      let required = element.optional != null && element.optional == true ? 'false' : 'true';
      let def = element.defaultvalue != null ? element.defaultvalue : '-';

      text += `<td>${this.renderType(classItem, typeName)}</td>\n`;
      //text += `<td>${required}</td>\n`;
      text += `<td>${def}</td>\n`;
      text += `<td>${this.getDesc(element)}</td>\n`;

      text += '</tr>\n';
    }

    text += '</table>\n';
    return text;
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
      if (x.longname == name && x.kind == 'class')
        ret = x;
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

  renderMethodList(item, title, selector) {
    let text = '';

    this.data.forEach(x => {
      if (x.ignore)
        return;

      if (!selector(x))
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

    if (text.length) {
      text = `<h2>${title}</h2>` + text;
    }

    return text;
  }


  renderPropertyList(item, title, selector) {
    let text = '';

    this.data.forEach(x => {
      if (x.ignore)
        return;

      if (!selector(x))
        return;

      var access = '';

      if (x.access) {
        //if (x.access != 'public' && x.access != 'protected' && x.access != 'static')
        if (x.access != 'public' && x.access != 'static')
          return;
      } else {
        if (x.scope)
          access = x.scope;

        if (access == 'instance')
          access = '';
      }

      if (x.memberof == item.name && (x.kind == 'member' || x.kind == 'constant')) {
        let name = x.name;

        text += `<a href="#${name}" class="method-name">${name}</a>`;
        //text += '| ' + access + ' ' + this.renderHref(x, name) + ' | ' + this.getShortDesc(x) + ' |\n';
      }
    });

    if (text.length) {
      text = `<h2>${title}</h2>` + text;
    }

    return text;
  }

  getDesc(item, isEnum = false) {
    if (!item || !item.description || item.description == 'undefined' || item.description == 'Description') {
      if (isEnum)
        return '-';

      return `<span class="no-description">NO DESCRIPTION</span>`;
    }

    return this.parseCodeTag(this.parseLinks(item.description));
  }

  parseCodeTag(desc) {
    if (desc == undefined)
      return desc;
    while (desc.indexOf('`') !== -1) {
      desc = desc.replace('`', '<code>').replace('`', '</code>');
    }

    return desc;
  }

  parseLinks(desc) {
    // let links = [];

    let regex = new RegExp(/{@link\s(.+?)(#|\|)(.+?)}/g);
    let m;

    while ((m = regex.exec(desc)) !== null) {
      if (m[2] === '#') {

        desc = desc.replace(m[0], `<a href="${this.getClassPath(m[1])}#${m[3]}" class="method-name">${m[1]}.${m[3]}</a>`);
      }
    }

    return desc;
  }

  getClassPath(className) {
    let p = `${BASE_URL}`;
    let type = this.seekClass(className);
    if (!type)
      return p;
    let cat = this.getTypeCat(type);
    if (!cat)
      return p;
    let path = cat.split('.').join('/');
    p += `${path}/${className}`;
    return p;
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
    for (let i = 0; i < item.params.length; i++) {
      let element = item.params[i];

      if (!element.type) {
        debugger;
        return;
      }

      for (let k = 0; k < element.type.names.length; k++) {
        text += element.type.names[k];

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
    for (let i = 0; i < item.params.length; i++) {
      let element = item.params[i];

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
  let dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const classNames = [];

for (let i = 0; i < templateData.length; i++) {
  let identifier = templateData[i];
  let cat = null;

  if (identifier.kind === 'class' || identifier.kind === 'enum') {
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