const { Schema, model, Model } = require('mongoose');
const { Password } = require('../helpers');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username cannot be empty'],
            validate: {
                validator(value) {
                    return User.findOne({
                        username: value
                    }).then(user => {
                        if (user) return false;
                        else return true;
                    });
                },
                message: 'Username must be unique'
            }
        },
        email: {
            type: String,
            required: [true, 'Email cannot be empty'],
            match: [
                /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                'Your email is not valid format'
            ],
            validate: {
                validator(value) {
                    return User.findOne({
                        email: value
                    }).then(user => {
                        if (user) return false;
                        else return true;
                    });
                },
                message: 'Email must be unique'
            }
        },
        password: {
            type: String,
            required: [true, 'Password cannot be empty'],
            minlength: [6, 'Password min 6 digits']
        },
        avatar: {
            type: String
        },
        address: {
            type: String,
            required: [true, 'Address cannot be empty']
        },
        phone: {
            type: String,
            required: [true, 'Phone cannot be empty']
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

UserSchema.pre('save', function(next) {
    this.password = Password.hash(this.password);
    next();
});

const User = model('User', UserSchema);

module.exports = User;
