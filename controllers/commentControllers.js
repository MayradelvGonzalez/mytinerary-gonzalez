const Itineraries = require('../models/itineraries');

const commentControllers = {
    addComment : async (req, res) => {
        const { itineraryId, comments } = rep.body.comentario;
        const userId= req.user_id;
        try {
            const nuevoComment  = await Itineraires.findOneAndUpdate(
                { _id: itineraryId },
                {
                    $push: {
                        comments: { comment: comments, userId: userId},
                    },
                },
                { new: true }
            ).populate("comments.userId", { fullName: 1});
            res.json({
                success: true,
                response: { nuevoComment },
                message: "Thaks for your comment!",
            });
        } catch (error) {
            res.json({
                success: false,
                message: "something goes wrong, try again in a few minutes",
            });
        }
    },

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

module.esports = commentControllers;