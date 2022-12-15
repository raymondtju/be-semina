const Categories = require("./model");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await Categories.create({ name });
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await Categories.find();
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

const findOne = async (req, res, next) => {
  try {
    const result = await Categories.findOne({_id: req.params.id});
    
    if (!result) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  try {
    const result = await Categories.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});

    res.status(200).json({
      data: result,
    })
  } catch (err) {
    next(err);
  }
}

const remove = async (req, res, next) => {
  try {
    const result = await Categories.findOneAndDelete({_id: req.params.id});

    res.status(200).json({
      data: result,
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
}