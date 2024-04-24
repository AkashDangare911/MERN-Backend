import categoryModel from "../models/categorymodel.js"

class CategoryController{
    static getAllCategories = async (req,res) =>{
        try
        {
            const fetchAllCategories = await categoryModel.find({});
            return res.status(200).json(fetchAllCategories);
        }
        catch(error)
        {
            return res.status(400).json({message:error.message});
        }
    }; 

    static addNewCategory = async (req,res) => {
        const { title } = req.body;
        try
        {
            if(title)
            {
                const cat = await categoryModel.findOne({ title:title });

                if(cat)
                    return res.status(200).json({message:"Category already exists !"});
                else
                {
                    const newCategory = new categoryModel({title});
    
                    const savedCategory = await newCategory.save();
    
                    if(savedCategory)
                        return res.status(200).json({message:"Category Added Successfully"});
                    else
                        return res.status(400).json({message:error.message});
                }
            }
            else
                return res.status(400).json({message:"Category field is required"});
        }
        catch(error)
        {
            return res.status(400).json({message:error.message});
        }
    }
}

export default CategoryController;