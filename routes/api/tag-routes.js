const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    let tag = await Tag.findAll({
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        { 
          model: Category,
          attributes: ['category_name']
        },
        { 
          model: Tag, 
          attributes: ['tag_name']
        }
      ]
    })

    res.status(200).json(tag)

  }catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    let tags = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'product_id', 'tag_id'],
      include: [
        { 
          model: Product, 
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })

    if(!tags){
      res.status(404).json({message: "No tags with this ID found"});
      return
    } 

    res.status(200).json(tags)

  } catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
