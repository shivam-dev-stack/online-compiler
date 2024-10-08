import connect from "../dbConnect.js";

export const compiler = async(req,res)=>{
    const query = "select * from language"
    
    try{
        connect.query(query,(err,result)=>{
            if(err){
                throw err;
            }
            return res.status(200).json({
                result: result
            })
        })
    }
    catch(error){
        return res.status(500).json({message: "Internal server error", error:error.message});
    }
};