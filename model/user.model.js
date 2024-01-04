const mongoose = require("mongoose");

/*
id (unique identifier)
name (string, 1-50 characters)
avatar (string, URL)
email (string, valid email format)
password (string)
created_at (timestamp, automatically set when the user is created)
updated_at (timestamp, automatically updated when the user is updated)
*/
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
