import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Expert from "../models/ExpertSchema.js";

export const updateUser=async(req,res)=>{
    const id =req.params.id;

    try {
        const updateUser=await User.findByIdAndUpdate(id,{$set:req.body},{new:true});

        res.status(200).json({succes:true,message:'Successfully updated',data:updateUser});

    } catch (error) {
        res.status(500).json({succes:false,message:'Failed to updated'}) ;  
    }
}

export const deleteUser=async(req,res)=>{
    const id =req.params.id;

    try {
        const deleteUser=await User.findByIdAndDelete(id,{$set:req.body},{new:true});

        res.status(200).json({succes:true,message:'Successfully delete'});

    } catch (error) {

        res.status(500).json({succes:false,message:'Failed to delete'}) ;  
    }
}

export const getSingleeUser=async(req,res)=>{
    const id =req.params.id;

    try {
        const user=await User.findById(id).select("-password");

        res.status(200).json({succes:true,message:'user found',data:user});
    } catch (error) {
        res.status(404).json({succes:false,message:'No user found'}) ;  
    }
}

export const getAllUser=async(req,res)=>{   

    try {
        const users=await User.find({}).select("-password");

        res.status(200).json({succes:true,message:'users found',data:users});
    } catch (error) {
        res.status(404).json({succes:false,message:'Not found'}) ;  
    }
};

export const getUserProfile = async(req,res)=>{
    const userId =req.userId;

    try {
        const user = await User.findById(userId);

        if(!user){
            res.status(404).json({succes:false,message:' Profile Not found'});  
        }

        const {password, ...rest}=user._doc;

        res.status(200).json({succes:true,message:'profil info is getting',data:{...rest}});

    } catch (error) {
        res.status(500).json({succes:false,message:'Something wnet wrong,can not get'});  
    }
};

export const getMyAppointments = async(req,res)=>{

    try {
        //step1 
        const bookings = await Booking.find({user:req.userId});
        //step2
        const expertIds =bookings.map(el=>el.dotor.id);
        //step3
        const experts = await Expert.find({_id: {$in:doctorIds}}).select('-password');

        res.status(200).json({succes:true,message:'Appointments are getting',data:experts});

        
    } catch (error) {
        res.status(500).json({succes:false,message:'Something wnet wrong,can not get'});  
    }
}
