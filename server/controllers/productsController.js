import products from "../models/productModel.js";

export const createProductController = async (req, res) => {
    const {userId, category, name, note, image} = req.body;
    const categoryExist = await products.find({userId: userId, categoryList: category});

    if(categoryExist.length > 0){
       const addProduct = await products.updateOne(
        {"miniLists.userId": userId, "miniLists.categoryList": category},
        {
            $addToSet: {
                product:{
                    category: category,
                    name: name,
                    note:note,
                    image:image,
                    quantity: 1
                }
            }
        }
        )
        res.send(addProduct);
    }else{
        const addCategory = new products({
            userId: userId,
            categoryList: category,
            statusOfList: "editing",
            dateOfList: new Date(),
            product:[{
                name: name,
                note: note,
                image: image,
                quantity: 1
            }]
        })

        await addCategory.save();

        res.send(addCategory);
    }
}

//When I select the items tab, I can see a list of items under different categories.

/*export const getCategoriesController = async (req, res) => {
    const {userId} = req.params;
    let a = userId.toString();
    console.log(a);
    const getCategories = await products.find({userId: a});

    res.send(getCategories);
}*/

export const getCategoriesController = async (req, res) => {
    const {id} = req.params;

    if(id){
        const getCategories = await products.find({"list._id": id});
        res.send(getCategories);
    }else{
        const getCategories = await products.find().limit(1);
        res.send(getCategories);
    }
}
//I can increase the number of item in the list

export const increaseQuantityController = async (req, res) => {
    const {productId, quantity} = req.params;
    console.log(quantity);
    await products.updateOne(
        {"miniLists.product._id": productId},
        {
            $set: {"miniLists.$.product.$.quantity": quantity}
        }
    )
    res.sendStatus(200);
}

//I can remove the item from the list
export const removeItemController = async (req, res) => {
    const {userId, productId } = req.params;
    await products.updateOne(
        {"miniLists.userId": userId},
        {$pull: {product: {_id: productId}}}
    );
    res.sendStatus(200);
}

//I can save/update the list with a name
export const updateListNameController = async (req, res) => {
    const {listId, listName} = req.params;
    await products.updateOne(
        {"list._id": listId},
        {
            $set:{listName: listName}
        }
    )
    res.sendStatus(200);

}

//I can cancel the active list
export const statusListController = async (req, res) => {
    const {listId} = req.params;
    await products.updateOne(
        {"list._id": listId},
        {
            $set:{
                statusOfList: "cancelled"
            }
        }
    )
    res.sendStatus(200);
}

