const replaceAllInString = (str, search, replace) => str.split(search).join(replace);

// email template to be store in a variable
const prepareEmailTemplate = (templateName, thingsToReplace) => {
  const tplBuffer = fs.readFileSync(resolve(__dirname, '..', 'services', templateName));
  const tplString = tplBuffer.toString();
  return Object.entries(thingsToReplace).reduce((acc, c) => replaceAllInString(acc, c[0], c[1]), tplString);
};

// to create a file with js inside
const prepareJsTemplate = (templateName, newTemplateName, thingsToReplace) => {
  const tplBuffer = fs.readFileSync(resolve(__dirname, '..', 'services', templateName));
  const tplString = tplBuffer.toString();
  Object.entries(thingsToReplace).reduce((acc, c) => replaceAllInString(acc, c[0], c[1]), tplString);
  const output = resolve(__dirname, `${newTemplateName}.js`);
    fs.writeFileSync(output, withCreated);
  return;
};

// example thingsToReplace
const example = {
  test1: 'toto1',
  test2: 'toto2'
}

// not inside a function
const str = 'bonjour test1, ça va test2';
const replaceAllInString = (str, search, replace) => str.split(search).join(replace);
const toot = { test1: 'Jean', test2: 'louis' };
const result = Object.entries(toot).reduce((acc, c) => replaceAllInString(acc, c[0], c[1]), str);
console.log(result); // bonjour Jean, ça va louis