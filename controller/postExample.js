import connect from "../dbConnect.js";

export const postExample = async (req, res) => {
    const { title, code, description, id } = req.body;
    const query = `INSERT INTO example (title, code, description, id) VALUES (?, ?, ?, ?);`;
    try {
      if (!code || !title || !description || !id) {
        return res.status(400).json({ message: "Please provide code and id" });
      }
      connect.query(query, [title, code, description, id], (err, result) => {
        if (err) {
          throw err;
        }
        res.status(201).json({ message: "successful" });
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };


export const getExample = async(req,res)=>{
    const query = `select * from example`;
    try{
        connect.query(query,(err,result)=>{
            if(err){
                throw err
            }
            return res.status(201).json({message: "successfull", result:result});
        })
    }
    catch(error){
        return res.status(500).json({message: "Internal server error", error:error.message});
    }
}