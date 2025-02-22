

const getUser=(req,res)=>{
    try {
        return res.status(200).json({user:req.user,message:'User fetched successfuly!'})
        
    } catch (error) {
        return res.status(500).json({message:'Something went wrong!'})
    }
}

export default {
    getUser
}