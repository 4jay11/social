import mongoose from "mongoose";

const videoSchema =new mongoose.Schema({
imgUrl:{
    typeof: 'string',
    required: true
},
videoUrl:{
    typeof: 'string',
    required: true
}},{
    timestamps:true,
}
);

export default mongoose.model('Video',videoSchema,cloud);