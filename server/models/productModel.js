import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

    list:{
        listName:{
            type:String
        },
        listMonth:{
            type: Date
        },
        statusOfList:{
            type:String
        },
        miniLists:[{
            userId:{
                type:String
            },
            categoryList:{
                type:String
            },
            dateOfList:{
                type:Date
            },
            product:[
                {
                    category:{
                        type:String
                    },
                    name:{
                        type:String
                    },
                    note:{
                        type:String
                    },
                    image:{
                        type:String
                    },
                    quantity:{
                        type: Number
                    }
                }
            ]
        }]
    }
})

export default mongoose.model("products", ProductSchema);