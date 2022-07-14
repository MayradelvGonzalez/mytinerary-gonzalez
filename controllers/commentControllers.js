const Itineraries = require('../models/itineraries');

const commentControllers = {

    addComment: async (req, res) => {
        console.log("aca esta mi reqBody", req.body)
        const {itineraries,comment} = req.body.comment
        const user = req.user._id
        try {
            const nuevoComment = await Itineraries.findOneAndUpdate({_id:itineraries}, {$push: {comments: 
                {userId: user, comment: comment}}}, {new: true}).populate("comments.userId", {fullName:1, photo:1})
            console.log(nuevoComment)
                res.json({ success: true,
                    response: nuevoComment.comments, 
                    message:"Thanks for your comment" })
        }
        catch (error) {
            
            console.log(error)
            res.json({
                success: false, 
                message: "Something goes wrong, please try again later",
                console:console.log(error) })
        }

    },
    
     modifyComment: async (req, res) => {
        const {comment} = req.body
        const {id} = req.params
        const user = req.user._id
        try {
            const modifyComment = await Itineraries.findOneAndUpdate({"comments._id" : id}, {$set: {"comments.$.comment": comment }}, {new: true})
            console.log(modifyComment)
            res.json({ success: true, response:{modifyComment}, message:"Your comment was modified" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something goes wrong, please try again later" })
        }

     },

    deleteComment: async (req,res) => {
        const id = req.params.id;
        const user  =req.user._id; 
        try{
            const deleteComment = await Itineraries.findOneAndUpdate(
                { "comments._id": id },
                {
                   $pull: {
                    comments: {
                        _id: id,
                    },
                   },
                },

            )
            res.json({
                success: true,
                response: { deleteComment },
                message: "You has delete this comment"
            });
        } catch (error) {
            res.json({
                success: false,
                message: "Something goes wrong, pleas try again later"
            });
        }
    },
};

module.exports = commentControllers;