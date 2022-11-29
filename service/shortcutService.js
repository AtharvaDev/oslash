const { OslashException } = require("../exceptions/oslashException");
const shortcutRepo = require("../repository/shortcutRepo");

exports.createShortcut = async (userId, shortcut, url, description) => {
  const shortcutExists = await shortcutRepo.shortcutExists(userId, shortcut);
  if (shortcutExists) {
    throw new OslashException(400, "Shortcut already exists");
  }
  if (!this.checkUrl(url)) {
    throw new OslashException(400, "Invalid URL");
  }
  const shortlink = `o/${shortcut}`;
  return shortcutRepo.createShortcut(userId, shortlink, url, description);
};

exports.getShortcuts = async (userId) => {
  const result = shortcutRepo.getShortcuts(userId);
  if (result.length === 0) {
    throw new OslashException(404, "No shortcuts found");
  }
  return result;
};

exports.getShortcutById = async (userId, id) => {
  return shortcutRepo.getShortcutById(userId, id);
};

exports.updateShortcut = async (userId, id, shortcut, url) => {
  if (!this.checkUrl(url)) {
    throw new OslashException(400, "Invalid URL");
  }
  const shortlink = `o/${shortcut}`;
  const shortcutExists = await shortcutRepo.shortcutExists(userId, shortlink);
  if (shortcutExists) {
    throw new OslashException(400, "Shortcut already exists");
  }
  return shortcutRepo.updateShortcut(userId, id, shortlink, url);
};

exports.deleteShortcut = async (userId, id) => {
  return shortcutRepo.deleteShortcut(userId, id);
};

exports.shortcutExists = async (userId, shortcut) => {
  return shortcutRepo.shortcutExists(userId, shortcut);
};

exports.checkUrl = (string) => {
  let givenURL;
  try {
    givenURL = new URL(string);
  } catch (error) {
    console.log("error is", error);
    return false;
  }
  return true;
};

exports.filterShortcuts = (userId, sortBy, sortOrder) => {
  return shortcutRepo.filterShortcuts(userId, sortBy, sortOrder);
};

exports.searchShortcuts = (userId, search) => {
  return shortcutRepo.searchShortcuts(userId, search);
};
