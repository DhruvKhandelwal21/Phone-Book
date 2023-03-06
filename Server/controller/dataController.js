const Mydata =  require("../model/dataModel");
module.exports.sendMsg = async (req,res,next)=> {
    try{
        const {email,phone,name,from} = req.body;
        const data = await Mydata.create({
        email:email,
        phone:phone,
        name:name,
        sender: from,
        });
        if(data){

            return res.json({
                output:"successfully send",
               
               }); 
        }else{
            return res.json({output: "failure"});
        }
    }catch(e){
        console.log(e);
        next(e);
    }
    
};

module.exports.showMsg = async(req,res,next) =>{
    try{
        const{from} = req.body;
        
  Mydata.find({ sender: from })
  .then((response) => {
         console.log(response);
         res.json(response)
  }).catch((err) => {
    console.log(err);
  });
    
    // prints "The author is Bob Smith"
  
        

         
        
        // const getdata = data.map((item)=> {
        //     return{
        //         checkSender: otext.sender.toString()===from,
        //         originalMessage: otext.message
        //     }
        
              
            
        
        // res.json(data);
         

    }catch(e){
        console.log(e);
        next(e);
    }
}