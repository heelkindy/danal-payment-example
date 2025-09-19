const axios = require("axios");
const { generateAuthToken } = require("../utils/hmacUtil");
const config = require("../config/config");
const https = require("https");

const pgCode = "cybersource";
const paymentMethod = "creditcard";
// const country = "VN";
// const currency = "VND";
const country = "KR";
const currency = "KRW";

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // ❗ cho phép SSL self-signed (chỉ dùng khi STG test)
});

async function requestAuth(orderId, itemName, amount) {
    const uri = `${config.baseUrl}/api/v1/${pgCode}/${paymentMethod}/auth`; // ví dụ eximbay all
    const data = `${config.cpId}${amount}${orderId}`;
    const token = generateAuthToken(data, config.secretKey);

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "X-Auth-Token": token,
    };

    console.log("🚀 ~ requestAuth ~ headers:", headers);

    const body = {
        cp_id: config.cpId,
        country: country,
        pg_code: pgCode,
        paymethod: paymentMethod,
        item_name: itemName,
        currency: currency,
        amount: amount,
        order_id: orderId,
        user_id: "testuser",
        user_email: "testuser@test.com",
        return_url: config.returnUrl,
        notify_url: config.notifyUrl,
    };

    console.log("🚀 ~ requestAuth ~ body:", body);

    const response = await axios.post(uri, body, { headers, httpsAgent });

    console.log("🚀 ~ requestAuth ~ response.data:", response.data);

    return response.data;
}

async function confirmPayment(tid, returnToken) {
    const uri = `${config.baseUrl}/api/v1/payment/confirm`;

    const data = `${config.cpId}${tid}`;
    const token = generateAuthToken(data, config.secretKey);

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "X-Auth-Token": token,
    };

    console.log("🚀 ~ confirmPayment ~ headers:", headers);

    const body = {
        cp_id: config.cpId,
        tid: tid,
        return_token: returnToken,
    };

    console.log("🚀 ~ confirmPayment ~ body:", body);

    const response = await axios.post(uri, body, { headers });

    console.log("🚀 ~ confirmPayment ~ response.data:", response.data);

    return response.data;
}

async function billResult(tid, returnToken) {
    const uri = `${config.baseUrl}/api/v1/payment/bill-result`;
    const data = `${config.cpId}${tid}`;
    const token = generateAuthToken(data, config.secretKey);

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "X-Auth-Token": token,
    };

    console.log("🚀 ~ billResult ~ headers:", headers);

    const body = {
        cp_id: config.cpId,
        tid,
        return_token: returnToken,
    };

    console.log("🚀 ~ billResult ~ body:", body);

    const response = await axios.post(uri, body, { headers });

    console.log("🚀 ~ billResult ~ response.data:", response.data);

    return response.data;
}

async function cancelPayment(tid, amount, currency = "KRW", cancelType = "C") {
    const uri = `${config.baseUrl}/api/v2/${pgCode}/${paymentMethod}/cancel`; // đổi pg_code/paymethod theo giao dịch gốc
    const data = `${config.cpId}${tid}`;
    const token = generateAuthToken(data, config.secretKey);

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "X-Auth-Token": token,
    };

    const body = {
        cp_id: config.cpId,
        tid,
        cancel_type: cancelType, // "C" = full, "P" = partial
        currency,
        amount,
    };

    const response = await axios.post(uri, body, { headers, httpsAgent });
    return response.data;
}

module.exports = { requestAuth, confirmPayment, billResult, cancelPayment };
