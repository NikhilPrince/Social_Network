const { Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username needed",
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: "Username needed",
            match: [/.+@.+\..+/,]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectID,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectID,
                ref:"user"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;