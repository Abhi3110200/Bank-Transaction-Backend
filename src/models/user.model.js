import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true,"Email is required for creating a user"],
        trim:true,
        lowercase:true,
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Please enter a valid email address"],
        unique: [true,"Email is already exists."]
    },
    nam:{
        type:String,
        required:[true,"Name is required for creating a user"],
    },
    password: {
        type: String,
        required: [true,"Password is required for creating a user"],
        minlength:[6,"password should contain at least 6 characters"],
        select:false
    }
},{
    timestamps: true,
});

userSchema.pre('save', async function(next){

    if(!this.isModified("password")) return next();

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;