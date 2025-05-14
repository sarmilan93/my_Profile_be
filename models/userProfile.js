import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    //basic details
    profileImage: {
      type: String, // base64 string
      required: false,
    },
    salutation: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    //additional details
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    maritalStatus: {
      type: String,
      required: false,
    },

    //personal preferences
    hobbies: {
      type: String,
      required: false,
    },
    favoriteSports: {
      type: String,
      required: false,
    },
    musicGenres: {
      type: String,
      required: false,
    },
    movieTvShows: {
      type: String,
      required: false,
    },

    //spouse details
    spouseSalutation: {
      type: String,
      required: false,
    },
    spouseFirstName: {
      type: String,
      required: false,
    },
    spouseLastName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
