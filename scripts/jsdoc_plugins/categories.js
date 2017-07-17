/**
 * JSdoc plugin that allows categorization of classes
 * Found at: https://github.com/ErnstHaagsman/jsdoc-plugins
 */
exports.defineTags = function(dictionary) {
  dictionary.defineTag('cat', {
    mustHaveValue: true,
    onTagged: function(doclet, tag) {

      if (env.conf.categoryList.indexOf(tag.value) !== -1) {
        doclet.category = tag.value.split('/');
        doclet.categoryString = tag.value;
        doclet.categoryNestingLevel = doclet.category.length - 1;
        //doclet.cats = processCategories(
      } else {
        console.error('ERROR Undefined category "' + tag.value + '"');
        //throw 'Undefined category';
      }
    }
  });
};

exports.handlers = {
  parseBegin: function() {
    loadConfiguration();
  }
};

function loadConfiguration() {
  try {
    var fs = require('jsdoc/fs');
    var confFileContents = fs.readFileSync(env.conf.categoryfile, 'utf8');
    env.conf.categories = JSON.parse((confFileContents || "{}"));
    env.conf.categoryList = Object.keys(env.conf.categories);
  } catch (e) {
    throw 'Could not load category file';
  }
}
