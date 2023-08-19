const model = require("../models");

class Controller {
  static createCtrl(req, res) {
    try {
      let result = model.createData(req.body);
      res.json({
        status: 201,
        data: result,
      });
    } catch (error) {
      res.status(403).json({
        status: 403,
        data: error,
      });
    }
  }

  static readCtrl(req, res) {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      let data = model.readDataPagination(page, limit);
      res.status(200).json({
        status: 200,
        page: page,
        count: data.length,
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        data: error,
      });
    }
  }

  static updateCtrl(req, res) {
    try {
      let data = model.updateData(req.body, req.params);
      if (data) {
        res.status(200).json({
          status: 200,
          data: "Berhasil",
        });
      } else {
        res.status(400).json({
          status: 400,
          data: "Data tidak ditemukan",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        data: error,
      });
    }
  }

  static deleteCtrl(req, res) {
    try {
      let data = model.deleteData(req.params);
      if (data) {
        res.status(200).json({
          status: 200,
          data: "Berhasil",
        });
      } else {
        res.status(400).json({
          status: 400,
          data: "Data tidak ditemukan",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        data: error,
      });
    }
  }
}

module.exports = Controller;
