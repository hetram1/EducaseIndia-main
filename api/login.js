import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  phone: String,
  company: String,
  agency: String,
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectDB();
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const { password: _, ...userData } = user.toObject();
    res.json({ message: 'Login successful', user: userData });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}