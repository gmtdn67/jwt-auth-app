import { Schema, model, Model } from 'mongoose';
import { IToken } from '../types';

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export default model<IToken, Model<IToken>>('Token', TokenSchema);

