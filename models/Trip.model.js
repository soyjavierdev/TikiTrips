const { Schema, model } = require("mongoose");

const tripSchema = new Schema(
    {
        origin: {
            address: {
                type: String,
                required: [true, 'Please include the origin of your trip'],
            },
            location: {
                type: { type: String },
                coordinates: [Number]
            },
        },

        destination: {
            address: {
                type: String,
                required: [true, 'Please include the destination of your trip'],
            },
            location: {
                type: { type: String },
                coordinates: [Number]
            },
        },

        date: {
            type: Date,
            required: [true, 'Please include the date of your trip'],
        },

        description: {
            type: String,
            required: [true, 'Please include a description of at least 20 characters'],
            minlength: [20, 'Please include a description of at least 20 characters'],
        },

        numberOfPassengers: {
            type: Number,
            required: [true, 'Please include the number of passengers'],
            min: 1
        },

        smokingAllowed: {
            type: Boolean,
            default: true
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        passengers: {
            type: [Schema.Types.ObjectId],
            ref: 'User'

        }
    },
    /////// ¿METER IMAGEN DEL MAPA?
    {
        timestamps: true,
    }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;