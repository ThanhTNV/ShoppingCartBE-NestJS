import { ObjectId } from 'mongodb';

enum UserVerifyType {
  UNVERIFIED,
  VERIFIED,
}

enum USER_ROLE {
  ADMIN,
  STAFF,
  USER,
}

interface UserType {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  created_at?: Date;
  updated_at?: Date;
  email_verify_token?: string;
  reset_password_token?: string;
  verify?: UserVerifyType;

  // Optional fields
  bio?: string;
  profile_picture_url?: string;
  website?: string;
  location?: string;
  role?: USER_ROLE;
}

export class User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
  email_verify_token: string;
  reset_password_token: string;
  verify: UserVerifyType;
  bio: string;
  profile_picture_url: string;
  website: string;
  location: string;
  role: USER_ROLE;

  constructor(user: UserType) {
    this._id = user._id || new ObjectId();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.date_of_birth = user.date_of_birth;
    this.created_at = user.created_at || new Date();
    this.updated_at = user.updated_at || new Date();
    this.email_verify_token = user.email_verify_token || '';
    this.reset_password_token = user.reset_password_token || '';
    this.verify = user.verify || UserVerifyType.UNVERIFIED;
    this.bio = user.bio || '';
    this.profile_picture_url = user.profile_picture_url || '';
    this.website = user.website || '';
    this.location = user.location || '';
    this.role = user.role || USER_ROLE.USER;
  }
}
