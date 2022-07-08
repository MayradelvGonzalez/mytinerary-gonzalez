const Itineraries = require('../models/itineraries');

const commentControllers = {
    // addComment : async (req, res) => {
    //     const { itineraryId, comment } = req.body
    //     const userId= req.user._id;
    //     try {
    //         const nuevoComment  = await Itineraries.findOneAndUpdate(
    //             { _id: itineraryId },
    //             {
    //                 $push: {
    //                     comments: { comment: comment, userId: userId},
    //                 },
    //             },
    //             { new: true }
    //         )
    //         res.json({
    //             success: true,
    //             response: { nuevoComment },
    //             message: "Thaks for your comment!",
                
    //         });
        
    //     } catch (error) {
    //         res.json({
    //             success: false,
    //             message: "something goes wrong, try again in a few minutes",
    //         });
    //     }
    // },

    addComment: async (req, res) => {
        const {itineraryId,comments} = req.body
        const user = req.user._id
        try {
            const nuevoComment = await Itineraries.findOneAndUpdate({_id:itineraryId}, {$push: {comments: 
                {userId: user, comment: comments.comment,}}}, {new: true}).populate("comments.userId", {fullName:1, photo:1})
            console.log(nuevoComment)
                res.json({ success: true,
                    response:{nuevoComment}, 
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
        const {comment} = req.body.commentModify
        const {id} = req.params
        const user = req.user._id
        try {
            const modifyComment = await Itineraries.findOneAndUpdate({"comments._id":id}, {$set: {"comments.$.comment": comment }}, {new: true})
            console.log(modifyComment)
            res.json({ success: true, response:{modifyComment}, message:"tu comentario a sido modificado" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }

     },




    // modifyComment: async (req, res) => {
    //     const {commentId,comment} = req.body.comentario
    //     const user = req.user._id
    //     try {
    //         const nuevoComentario = await Itineraries.findOneAndUpdate({"comments._id":commentId}, {$set: {"comments.$.comment": comment,"comments.$.date": Date.now() }}, {new: true})
    //         console.log(nuevoComentario)
    //         res.json({ success: true, response:{nuevoComentario}, message:"Your comment was modify" })

    //     }
    //     catch (error) {
    //         console.log(error)
    //         res.json({ success: true, message: "Something goes wrong, please try again later" })
    //     }

    // },
    deleteComment: async (req,res) => {
        const id = req.params.id;
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