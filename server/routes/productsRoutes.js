import { Router } from "express";
import { createProductController, getCategoriesController, increaseQuantityController, removeItemController, statusListController, updateListNameController } from "../controllers/productsController.js";

const router = Router();

router.post('/createProduct', createProductController);

router.get('/:userId', getCategoriesController);

router.put('/:productId/:quantity', increaseQuantityController);

router.put('/delete/:userId/:productId', removeItemController);

router.put('/updateList/:listId/:listName', updateListNameController);

router.put('/cancelList/:categoryList', statusListController);

export default router;