const Category = require("../models/category");

exports.getCategoryByID = (req, res, next, id) => {

    Category.findById(id).exec((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "Category not found"
            })
        }
        req.category = category;
        next();
    })
    
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "NOT able save category"
            })
        }
        res.json({category});
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "NO Categories were found"
            })
        }
        res.json(categories);
    });
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    console.log( "CATEGORY 1 ", category);
    category.name = req.body.name;
    console.log("CATEGORY 2",category);
    console.log("BODY NAME",req.body.name)
  
    category.save((err, updatedCategory) => {
      if (err) {
        console.log("CATEGORY ",category.name);
        console.log(err);
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      
      res.json(updatedCategory);
    });
  };

exports.removeCategory = (req, res) => {
    const category = req.category;
    const name= req.category.name;
    
    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error: `Failed to delete ${name} category`
            });
        }
        res.json({
            message: `${name} Deleted Sucessfully`
        });
    });

};