import connect from "../dbConnect.js";
import * as fs from 'fs'; // fs package has no fs module so full package imported
import { createRequire } from 'module';
import { folder } from "../config/config.js";

const require = createRequire(import.meta.url); // imported as error in importing a package
const {exec} = require('child_process'); // child process imported as require

// compiler language list only for dev
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

// compile or run program on shell
export const run = async(req,res) =>{
    
    let {code,type} = req.body
    
    if(!code|| !type){
        return res.status(400).json({message: "Please provide code to compile"})
    }
    
    let command = ``;
    const rand = Math.floor(Math.random() * 10000) + 1;
    let fileName = '';

    if(type=="py"){
        fileName = `${folder.code}${type}_${(Date.now())}_${rand}.py`;
        command = `python ${fileName}`
    }else if(type=="js"){
        fileName = `${folder.code}${type}_${(Date.now())}_${rand}.js`;
        command = `node ${fileName}`
    }

    code = code.replace(/(?:\r\n|\r|\n)/g, '\\n'); // remove new line to \n

    const file = await fs.writeFile(fileName,code,(err)=>{
        if (err) {
            console.error(err);
          } else {
            
            console.log("The file has been saved!");
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                return res.status(200).json({
                    stdout
                })
            })
          }
    })
}