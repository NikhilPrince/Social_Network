const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const reactSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeclocked => dateFormat(timeclocked)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id:false,
    }
);


reactSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const react = model('Thought', reactSchema);

module.exports = react;