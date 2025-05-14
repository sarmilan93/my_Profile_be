export const getCurrentUser = (req, res) => {
  const user = (req).user;
  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  return res.json({ userId: user.id });
};
