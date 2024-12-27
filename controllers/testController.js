const testUserController=(req,res)=>{
    try{
        res.status(200).send({
            success:'test user data'
        })
    }catch(error){
     console.log('error in test api',error)
    }
};

module.exports={testUserController}