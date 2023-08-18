const NodeCache = require("node-cache");
const myCache = new NodeCache();

class Model {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  static createData(body) {
    let defKey = this.getMaxNumber();
    const { title, description } = body;
    this.saveData(title, description, defKey + 1);
    let value = myCache.get(defKey + 1);
    return value;
  }

  static readData(page, limit) {
    let mykeys = myCache.keys();
    let data = [];
    for (let i = 0; i < mykeys.length; i++) {
      data.push(myCache.get(mykeys[i]));
      data[i]["id"] = +mykeys[i];
    }
    let datas = this.paginate(data, limit);
    if (page >= 1) {
      return datas[page - 1];
    }
    return [];
  }

  static updateData(body, param) {
    let data = this.readData();
    const { title, description } = body;
    console.log(data);
    let findData = data.find((item) => item.id === +param.id);
    if (findData) {
      this.saveData(title, description, +param.id);
      return "berhasil";
    }
    return "data tidak ditemukan";
  }

  static deleteData(param) {
    let data = this.readData();
    let findData = data.find((item) => item.id === +param.id);
    if (!findData) {
      return "data tidak ditemukan";
    }
    myCache.del(+param.id);
    return "berhasil";
  }

  static getMaxNumber() {
    let mykeys = myCache.keys();
    console.log(mykeys);
    let data = [];
    for (let i = 0; i < mykeys.length; i++) {
      data.push(+mykeys[i]);
    }
    let max = 0;
    if (data.length > 0) {
      max = data.reduce((a, b) => Math.max(a, b), -Infinity);
    }
    return max;
  }

  static saveData(title, description, key) {
    let obj = new Model(title, description);
    let success = myCache.set(key, obj, 10000);
  }

  static paginate(arr, size) {
    return arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);
      return acc;
    }, []);
  }
}

module.exports = Model;
