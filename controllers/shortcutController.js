const shortcutService = require("../service/shortcutService");
const { OslashException } = require("../exceptions/oslashException");

exports.createShortcut = async (req, res) => {
  // #swagger.description = 'API for creating a shortcut';
  // #swagger.tags = ['Shortcut Module']
  /* #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Shortcut details",
                    required: true,
                    type: 'object',
                    schema: { $shortlink: "string", $url: "string", $description: "string" }
            } */

  try {
    const { shortlink, url, description } = req.body;
    const shortcutId = await shortcutService.createShortcut(
      req.userId,
      shortlink,
      url,
      description
    );
    res.send(`Shortcut with shortlink ${shortcutId} created successfully`);
  } catch (error) {
    console.error(error);
    if (error instanceof OslashException) {
      res.status(error.errorCode).send(error.errorMessage);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

exports.getShortcuts = async (req, res) => {
  // #swagger.description = 'API to get details of all the shortcuts';
  // #swagger.tags = ['Shortcut Module']

  try {
    const result = await shortcutService.getShortcuts(req.userId);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getShortcut = async (req, res) => {
  // #swagger.description = 'API to get details of a shortcut';
  // #swagger.tags = ['Shortcut Module']

  try {
    const shortLinkId = req.query.id;
    const result = await shortcutService.getShortcutById(
      req.userId,
      shortLinkId
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    if (error instanceof OslashException) {
      res.status(error.errorCode).send(error.errorMessage);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

exports.updateShortcut = async (req, res) => {
  // #swagger.description = 'API to update a shortcut';
  // #swagger.tags = ['Shortcut Module']
  /* #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Shortcut details",
                    required: true,
                    type: 'object',
                    schema: { $shortlink: "string", $url: "string", $description: "string" }
            } */

  try {
    const { shortlink, url, description } = req.body;
    const result = await shortcutService.updateShortcut(
      req.userId,
      req.query.id,
      shortlink,
      url,
      description
    );
    res.send(`Shortcut id ${result} updated successfully`);
  } catch (error) {
    console.error(error);
    if (error instanceof OslashException) {
      res.status(error.errorCode).send(error.errorMessage);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

exports.deleteShortcut = async (req, res) => {
  // #swagger.description = 'API to delete a shortcut';
  // #swagger.tags = ['Shortcut Module']

  try {
    const result = await shortcutService.deleteShortcut(
      req.userId,
      req.query.id
    );
    res.send(`Shortlink ${result} deleted successfully`);
  } catch (error) {
    console.error(error);
    if (error instanceof OslashException) {
      res.status(error.errorCode).send(error.errorMessage);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

exports.filterShortcuts = async (req, res) => {
  // #swagger.description = 'API to sort shortcuts based on shortlink, description and created_date in ASC or DESC order';
  // #swagger.tags = ['Shortcut Module']

  try {
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;

    const result = await shortcutService.filterShortcuts(
      req.userId,
      sortBy,
      sortOrder
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    if (error instanceof OslashException) {
      res.status(error.errorCode).send(error.errorMessage);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

// search shortcuts
exports.searchShortcuts = async (req, res) => {
  // #swagger.description = 'API to search shortcuts based on shortlink and description';
  // #swagger.tags = ['Shortcut Module']

  try {
    const search = req.query.search;
    const result = await shortcutService.searchShortcuts(req.userId, search);
    res.send(result);
  } catch (error) {
    console.error(error);
    if (error instanceof OslashException) {
      res.status(error.errorCode).send(error.errorMessage);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};
