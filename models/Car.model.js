const { Schema, model } = require("mongoose");

const carSchema = new Schema(
    {
        picture: {
            type: String,
            required: [true, 'Please include a picture of the car'],
        },

        license: {
            type: String,
            required: [true, 'Please include the license plate of the car'],
        },

        brand: {
            type: String,
        },

        model: {
            type: String,
        },

        year: {
            type: Number,
        },

        color: {
            type: String,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },

    {
        timestamps: true,
    }
);

const Car = model("Car", carSchema);

module.exports = Car;