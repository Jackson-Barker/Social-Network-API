const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectID,
      default: new Types.ObjectID(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

  module.export = reactionSchema;
