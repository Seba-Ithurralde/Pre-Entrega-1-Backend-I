import { Router } from "express";
import { CartManager } from "../managers/cartManager.js";
import { ProductManager } from "../managers/productManager.js";

const cartManager = new CartManager();
const productManager = new ProductManager();
const router = Router();


router.post('/', async (req, res) => {
    try {
        const cartItems = await cartManager.getCartItems();
        res.send(cartItems);
    } 
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartManager.getCartById(cid);
      res.send(cart);
    } 
    catch (error) {
      console.log(error);
      res.send(error.message);
    }
  });

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;
    try {
        const product = await productManager.getProductById(pid);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        const addedCartItem = await cartManager.addCartItem(cid, {
            pid,
            quantity,
            price: product.price,
        });
        res.send(addedCartItem);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

export default router;