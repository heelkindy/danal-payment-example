const crypto = require("crypto");

function generateAuthToken(data, secretKey) {
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(data, "utf8");
    return Buffer.from(hmac.digest()).toString("base64");
}

module.exports = { generateAuthToken };
