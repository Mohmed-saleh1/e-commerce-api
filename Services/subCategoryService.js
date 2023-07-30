
const asyncHandler=require('express-async-handler')

const slugify = require('slugify')

const SubCategory = require('../Models/subCategoryModel')


exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({
      name,
      slug: slugify(name),
      category,
    });
    res.status(201).json({ data: subCategory });
  });