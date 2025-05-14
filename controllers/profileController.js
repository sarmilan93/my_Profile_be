import Profile from '../models/userProfile.js';

export const getUserProfile = async (req, res) => {
    const user = req.user.id;
    if (!user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const profile = await Profile.findOne({ userId: user });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        return res.json(profile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBasicDetails = async (req, res) => {
    const { salutation, firstName, lastName, email, profileImage } = req.body;
    if (!firstName || !lastName || !email || !salutation) {
        return res.status(400).json({ message: 'First name, last name, email, and salutation are required' });
    }
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            { salutation, firstName, lastName, email, profileImage },
            { new: true, runValidators: true, upsert: true }
        );
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAdditionalDetails = async (req, res) => {
    const { address, country, postalCode, dateOfBirth, gender, maritalStatus } = req.body;
    if (!address || !country || !postalCode) {
        return res.status(400).json({ message: 'Address, country, postal code are required' });
    }
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            { address, country, postalCode, dateOfBirth, gender, maritalStatus },
            { new: true, runValidators: true, upsert: true }
        );
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePersonalPreferences = async (req, res) => {
    const { hobbies, favoriteSports, musicGenres, movieTvShows } = req.body;

    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            { hobbies, favoriteSports, musicGenres, movieTvShows },
            { new: true, runValidators: true, upsert: true }
        );
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSpouseDetails = async (req, res) => {
    const { spouseSalutation, spouseFirstName, spouseLastName } = req.body;

    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            { spouseSalutation, spouseFirstName, spouseLastName },
            { new: true, runValidators: true, upsert: true }
        );
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};