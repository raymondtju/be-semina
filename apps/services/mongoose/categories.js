const Categories = require('../../api/v1/categories/model')
const {BadRequestError, NotFoundError} = require('../../api/errors')

const getAllCategories = async () => {
    const result = await Categories.find()

    return result
}

const createCategory = async (req) => {
    const {name} = req.body
    
    const check = await Categories.findOne({name})
    if (check) {
        throw new BadRequestError('Category already exists')
    }

    const result = await Categories.create({name})
    return result
}

const getOneCategory = async (req) => {
    const result = await Categories.findOne({_id: req.params.id});

    const check = await Categories.findOne({_id: req.params.id})
    if (!check) {
        throw new NotFoundError
    }

    return result
}

const updateCategory = async (req) => {
    const check = await Categories.findOne({_id: req.params.id})
    if (!check) {
        throw new BadRequestError('Category not found')
    }
    const checkName = await Categories.findOne({name: req.body.name})
    if (checkName) {
        throw new BadRequestError('Category already exists')
    }
    
    const result = await Categories.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    return result
}

const deleteCategory = async (req) => {
    const check = await Categories.findOne({_id: req.params.id})

    if (!check) {
        throw new NotFoundError('Category not found')
    }

    const result = await Categories.findOneAndRemove({_id: req.params.id});
    return result
}

module.exports = {
    getAllCategories,
    createCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
}