const dbconnect = require("../database/db");
const { OslashException } = require("../exceptions/oslashException");

exports.createShortcut = async (userId, shortlink, url, description) => {
  const query = `INSERT INTO shortcuts (user_id, shortlink, url, description, created_date) 
                        VALUES (${userId}, '${shortlink}', '${url}', '${description}', now()) RETURNING shortlink`;
  console.log(query);
  const result = await dbconnect(query);
  return result.rows[0].shortlink;
};

exports.getShortcuts = async (userId) => {
  const query = `SELECT * FROM shortcuts WHERE user_id = $1 AND active=true`;
  const result = await dbconnect(query, [userId]);
  return result.rows;
};

exports.getShortcutById = async (userId, id) => {
  const query = `SELECT * FROM shortcuts WHERE user_id = ${userId} AND id = ${id} AND active=true`;
  console.log(query);
  const result = await dbconnect(query);
  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    throw new OslashException(404, "Shortcut not found");
  }
};

exports.updateShortcut = async (userId, id, shortlink, url) => {
  const query = `UPDATE shortcuts SET shortlink = '${shortlink}', url = '${url}' WHERE user_id = ${userId} AND id = ${id} RETURNING id`;
  console.log(query);
  const result = await dbconnect(query);
  return result.rows[0].id;
};

exports.deleteShortcut = async (userId, id) => {
  const query = `DELETE FROM shortcuts WHERE user_id = $1 AND id = $2 returning shortlink`;
  const result = await dbconnect(query, [userId, id]);
  if (result.rows.length > 0) {
    return result.rows[0].shortlink;
  } else {
    throw new OslashException(404, "Shortcut not found");
  }
};

exports.shortcutExists = async (userId, shortlink) => {
  const query = `SELECT * FROM shortcuts WHERE user_id = $1 AND shortlink = $2`;
  const result = await dbconnect(query, [userId, shortlink]);
  console.log(result.rows);
  return result.rows.length > 0;
};

exports.filterShortcuts = async (userId, sortBy, sortOrder) => {
  const query = `SELECT * FROM shortcuts WHERE user_id = ${userId} AND active=true ORDER BY ${sortBy} ${sortOrder} `;
  const result = await dbconnect(query);
  return result.rows;
};

exports.searchShortcuts = async (userId, search) => {
  const query = `SELECT * FROM shortcuts WHERE user_id = ${userId} AND active=true AND (shortlink LIKE '%${search}%' OR description LIKE '%${search}%')`;
  const result = await dbconnect(query);
  return result.rows;
};
