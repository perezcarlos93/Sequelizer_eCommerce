const router = require('express').Router();
const { Category, Product } = require('../../models');


// find all categories
router.get('/', async (req, res) => {
  try{
    let categories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })

    if(!categories){
      res.status(404).json("No categories found")
    }

    res.status(200).json(categories)

  }catch (err) {
    res.status(400).json(err)
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try{
    let categories = await Category.findByPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })

    if(!categories){
      res.status(404).json("No categories found")
    }

    res.status(200).json(categories)

  }catch (err) {
    res.status(400).json(err)
  }
});

// Creates new Category
router.post('/', async (req, res) => {
  try{
    let newCategory = await Category.create(
      {
        category_name: req.params.category_name
      }
    )

    if(!category_name){
      res.status(404).json("No category name was received")
    }

    res.status(200).json(newCategory)

  }catch (err) {
    res.status(400).json(err)
  }
});

// Update's specific category
router.put('/:id', async (req, res) => {
  try{
    let category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }})

      if(!category){
        res.status(404).json("No category name was received")
      }

    res.status(200).json(category)


  }catch (err) {
    res.status(400).json(err)
  }
});

// Removes specific category
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  let category = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
});

module.exports = router;
