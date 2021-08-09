const mongoose=require('mongoose');

const pradFRI_schema=new mongoose.Schema(
    {
      
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
   
    },
    {
        timestamps:true,
    }
);

const PADFri=mongoose.model('PADFri', pradFRI_schema);
module.exports=PADFri;