import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserProfile extends Document {
  username: string;
  userPassword: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserProfile>(
  {
    username: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
    const user = this as UserProfile;
  
    if (!user.isModified('userPassword')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.userPassword, salt);
      user.userPassword = hashedPassword;
      return next();
    } catch (error: any) { // Specify the error type as 'any'
      return next(error);
    }
  });

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.userPassword);
};

export default mongoose.model<UserProfile>('User', userSchema);
