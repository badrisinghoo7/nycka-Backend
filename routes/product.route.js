const { Router } = require("express");
const { ProductModel } = require("../model/product.model");

const productRouter = Router();

productRouter.post("/", async (req, res) => {
  try {
    req.body.created_at = new Date();
    let product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({ message: "product added successfully", product });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, err: "this is the catch error" });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (products.length === 0 || !products) {
      res.status(200).json({ error: "no products found" });
    }
    res.status(200).send(products);
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message, err: "this is the catch error" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      res.status(200).json({ error: "no products found" });
    } else {
      res.status(200).send(product);
    }
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message, err: "this is the catch error" });
  }
});

// patch request to update the data
productRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndUpdate(id);
    if (!product) {
      res.status(204).json({ error: "no products found" });
    } else {
      res
        .status(204)
        .send({ product, message: "product updated successfully" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message, err: "this is the catch error" });
  }
});

//delete request
productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      res.status(202).json({ error: "no products found" });
    } else {
      res
        .status(202)
        .send({ product, message: "product deleted successfully" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message, err: "this is the catch error" });
  }
});

module.exports = {
  productRouter,
};
