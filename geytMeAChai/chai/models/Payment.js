import mongoose from "mongoose";
const {Schema, model} = mongoose;

const PaymentSchema = new Schema( {
        name: {type: String, required: true},
        toUser: {type: String, required: true},
        orderId: {type: String, required: true},
        message: {type: String},
        amount: {type: Number, required: true},
        createdAt: {type: Date, default: Date.now()},
        updatedAt: {type: Date, default: Date.now()},
        done: {type: Boolean, default: false}
})

const PaymentModel = mongoose.models.Payment || model("Payment", PaymentSchema);

export default PaymentModel;