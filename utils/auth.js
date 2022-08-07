import { hash, compare } from 'bcrypt';

export async function hasPassword(password) {
  const hash_ = await hash(password, 12);
  return hash_;
}

export async function VerifyPassowrd(plainTextPass, hasPassowrd) {
  const res = await compare(plainTextPass, hasPassowrd);
  return res;
}
