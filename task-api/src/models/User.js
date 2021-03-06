import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            unique: true
        },
        password: { type: String, required: true },
    },

    { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
    return password === this.password;
};

schema.methods.setPassword = function setPassword(password) {
    this.password = password;
};



schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
            email: this.email
        },
        "secretkey"
    );
};

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT()
    };
};

schema.method.getEmail  = function getEmail(){
    return{
        email:this.email
    };
};

schema.plugin(uniqueValidator, { message: "this email is already taken" });

export default mongoose.model("User", schema);
