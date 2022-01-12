const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [],
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    //   self reference
    thoughts: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friend.length;
});

const User = model("User", userSchema);

module.exports = User;