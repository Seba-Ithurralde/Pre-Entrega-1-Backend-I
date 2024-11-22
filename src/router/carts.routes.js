import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts(limit);
        res.send(products);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.get("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock, category } = req.body;
    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
    };
    try {
        const newProduct = await productManager.addProduct(product);
        res.send(newProduct);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});



router.get("/:cid", (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === Number(id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.send(user);
});

router.post("/:products", (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === Number(id));
    if (!user) {
        return res.status(404).send("Products not found");
    }
    const { products } = req.body;
    user.products = products;
    res.send(user);
});
router.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
    const user = users.find(user => user.id === Number(cid));
    if (!user) {
        return res.status(404).send("User not found");
    }
    const product = products.find(product => product.id === Number(pid));
    if (!product) {
        return res.status(404).send("Product not found");
    }
    user.products.push(product);
    res.send(user);
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === Number(id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    const { name } = req.body;
    user.name = name;
    res.send(user);
});

    router.delete("/", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id === Number(id));
    if (index === -1) {
        return res.status(404).send("User not found");
    }
    users.splice(index, 1);
    res.send(users);
});


export default router;