const express = require("express");
const router = express.Router();
const { requestAuth, confirmPayment, billResult } = require("../services/danalPaymentService");

// Step 1: Auth API
router.post("/auth", async (req, res) => {
    try {
        const { orderId, itemName, amount } = req.body;
        const result = await requestAuth(orderId, itemName, amount);
        res.json(result); // chứa start_url để redirect user
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Step 2: Return URL (Danal redirect về sau khi user thanh toán)
router.post("/return", async (req, res) => {
    try {
        const { tid, return_token, bill_flow_type } = req.body;
        console.log("🚀 ~ req.body:", req.body);
        let result;

        if (bill_flow_type === "2step") {
            result = await confirmPayment(tid, return_token);
        } else {
            result = await billResult(tid, return_token);
        }

        console.log("🚀 ~ result:", result);

        if (result.returncode === "00000") {
            res.redirect("http://localhost:3001/success"); // frontend port 3001
        } else {
            res.redirect("http://localhost:3001/fail");
        }
    } catch (err) {
        console.error("🚀 ~ err:", err);
        res.redirect("http://localhost:3001/fail");
    }
});

// Step 3: Notify URL (Danal gọi server-side)
router.post("/notify", async (req, res) => {
    try {
        console.log("Notify received:", req.body);
        // TODO: lưu trạng thái giao dịch vào DB
        res.json({ returncode: "00000" }); // bắt buộc trả về 00000
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
