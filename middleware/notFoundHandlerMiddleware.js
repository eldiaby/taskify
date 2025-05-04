const fs = require(`node:fs`);

const html = fs.readFileSync(`${__dirname}/not-found.html`, 'utf-8');

notFoundMiddleware = (req, res) => res.status(404).send(html);

module.exports = notFoundMiddleware;
// This middleware function handles 404 errors by sending a custom HTML page as the response. It reads the HTML content from a file and sends it with a 404 status code when a requested resource is not found.
// The middleware is exported for use in other parts of the application, typically in the main server file.
