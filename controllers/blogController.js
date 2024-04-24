import blogModel from "../models/blogmodel.js"

class BlogController{

    static getSaareBlogs = async (req,res) =>{
        try{
            const fetchSaareBlogs = await blogModel.find({});
            return res.status(200).json(fetchSaareBlogs);
        }
        catch(error)
        {
            return res.status(400).json({message:error.message});
        }
    }

    // get all blogs of single specified user 
    static getMyBlogs = async (req,res) =>{
        try{
            const fetchAllBlogs = await blogModel.find({ user:req.user._id });
            return res.status(200).json(fetchAllBlogs);
        }
        catch(error)
        {
            return res.status(400).json({message:error.message});
        }
    }

    static addNewBlog = async (req,res) =>{
        
        const {title,category,description} = req.body;
        try{
            if(title && category && description)
            {
                const addBlog = new blogModel({
                    title:title,
                    description:description,
                    category:category,
                    thumbnail:req.file.filename,
                    user:req.user._id,
                });

                const savedBlog = await addBlog.save();
                if(savedBlog){
                    return res.status(200).json({message:"Blog added successfully"});
                }
                else{
                    return res.status(400).json({message:"Unable to save blog"});
                }
            }
            else{
                return res.status(400).json({message:"all fields are mandatory"});
            }
        }
        catch(error)
        {
            return res.status(400).json({message:"Choose thumbnail for your post.."});
        }
    }

    static getSingleBlog = async (req,res) =>{
        const {id} = req.params;
        try{
            if(id)
            {
                const fetchBlogsByID = await blogModel.findById(id);
                return res.status(200).json(fetchBlogsByID);
            }
            else{
                return res.status(400).json({message:"Invalid URL"});
            }
        }catch(error)
        {
            return res.status(400).json({message:error.message});
        }
    }

    // static deleteBlog = async (req,res) => {
    //     const { id } = req.params;

    //     try
    //     {
    //         const oneUser = await user.findById(id);
    //         // const isDelted = await 
    //         oneUser.deleteOne();

    //         if(isDelted)
    //             return res.status(200).json({message:"Blog deleted Successfully !"});
    //         else
    //             return res.status(400).json({message:"Unable to Delete !"});            
    //     }
    //     catch(error)
    //     {
    //         res.status(400).json({message:error.message});
    //     }
    // }
};

export default BlogController;