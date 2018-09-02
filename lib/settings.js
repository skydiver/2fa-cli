const Configstore = require('configstore');

class Settings {
  constructor(name) {
    this.conf = new Configstore(name);
  }
  async readParameter(prop) {
    const parameter = this.conf.get(`keys.${prop}`);
    return parameter || false;
  }
  async storeParam(prop, key) {
    this.conf.set(`keys.${prop}`, key);
  }
  async clearParam(prop) {
    this.conf.delete(`keys.${prop}`);
  }
  async clearAll() {
    for (let prop of Object.keys(this.conf.get('keys'))) {
      await this.clearParam(prop);
    }
  }
}

module.exports = Settings;