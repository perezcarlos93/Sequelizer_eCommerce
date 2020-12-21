const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tag = await Tag.findAll({
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        {
          model: Tag,
          attributes: ["tag_name"],
        },
      ],
    });

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    let tags = await Tag.findByPk(req.params.id, {
      attributes: ["id", "product_id", "tag_id"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!tags) {
      res.status(404).json({ message: "No tags with this ID found" });
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let newTag = await Tag.create({
      tag_name: req.params.tag_name,
    });

    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json("error: " + err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tag) {
      res.status(404).json("No category name was received");
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tag) {
      res.status(404).json("No category name was received");
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
