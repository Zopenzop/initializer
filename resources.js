//const loadSchemas = require('./functions.js');
const fs = require('fs')

const schemas = loadSchemas();

module.exports = {
  schemas,
};

function loadSchemas() {
    let schem = {};
    const schema_files = fs.readdirSync("./resources/schemas/")
	.filter((file) => file.endsWith(".js"));

  for(const schema of schema_files){
    schem[schema.replace('-schema', '').replace('.js', '')] = require(`./schemas/${schema}`)
  }
  return schem;
}