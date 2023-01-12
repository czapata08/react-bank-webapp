import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
  },
  id: {
    type: String,
  },
  name: {
    firstname: {
      type: String,
      // required: true,
    },
    lastname: {
      type: String,
      // required: true,
    },
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  zip: {
    type: Number,
    // required: true,
  },
  balance: {
    type: Number,
    // required: false,
  },
  accounts: {
    balance: {
      type: Number,
    },
    name: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
  },

  // required: true,
  since: {
    type: Date,
    default: Date.now,
  },

  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export default mongoose.models?.User || mongoose.model("User", UserSchema);
