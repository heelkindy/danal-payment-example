module.exports = {
    cpId: process.env.DANAL_CP_ID,
    secretKey: process.env.DANAL_SECRET_KEY,
    // baseUrl: "https://api-pay-stg.danalpay.com:9443", // đổi sang PRD khi live
    baseUrl: process.env.DANAL_BASE_URL, // đổi sang PRD khi live
    returnUrl: process.env.DANAL_RETURN_URL,
    notifyUrl: process.env.DANAL_NOTIFY_URL,
};
