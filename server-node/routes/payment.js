const express = require("express");
const router = express.Router();
const { requestAuth, confirmPayment, bill, billResult, inquiryPayment } = require("../services/danalPaymentService");

// Step 1: Auth API (Initialize payment and get redirect URL)
router.post("/auth", async (req, res) => {
    try {
        const { orderId, itemName, amount } = req.body;
        const result = await requestAuth(orderId, itemName, amount);
        res.json(result); // Contains start_url to redirect users to payment page
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Step 2: Return URL (Danal redirect after user payment, handle user return after payment attempt)
// router.post("/return", async (req, res) => {
//     try {
//         const { tid, return_token, bill_flow_type } = req.body;
//         console.log("🚀 ~ req.body:", req.body);
//         let result;

//         if (bill_flow_type === "2step") {
//             result = await confirmPayment(tid, return_token);
//         } else {
//             result = await billResult(tid, return_token);
//         }

//         console.log("🚀 ~ result:", result);

//         if (result.returncode === "00000") {
//             res.redirect("http://localhost:3001/success"); // frontend port 3001
//         } else {
//             res.redirect("http://localhost:3001/fail");
//         }
//     } catch (err) {
//         console.error("🚀 ~ err:", err);
//         res.redirect("http://localhost:3001/fail");
//     }
// });

router.post("/return", async (req, res) => {
    console.log("🚀 ~ API return - req.body:", req.body);
    try {
        const { tid, return_token, bill_flow_type } = req.body;
        let result;

        if (bill_flow_type === "2step") {
            // B1: confirm
            const confirmRes = await confirmPayment(tid, return_token);

            if (confirmRes.returncode === "00000") {
                // B2: bill
                result = await bill(tid, return_token);
            } else {
                result = confirmRes; // confirm failed
            }
        } else {
            // 1step: call bill-result
            result = await billResult(tid, return_token);
        }

        // handle result (ex redirect to success/fail UI)
        if (result.returncode === "00000") {
            res.redirect("http://localhost:3001/success");
        } else {
            res.redirect("http://localhost:3001/fail");
        }
    } catch (err) {
        res.redirect("http://localhost:3001/fail");
    }
});

// Step 3: Notify URL (Danal call server-side)
router.post("/notify", async (req, res) => {
    try {
        console.log("Notify received:", req.body);
        // TODO: save transaction status to DB
        res.json({ returncode: "00000" }); // must return 00000
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cancel API
router.post("/cancel", async (req, res) => {
    try {
        const { tid, amount, currency, cancelType } = req.body;
        const result = await cancelPayment(tid, amount, currency, cancelType);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/inquiry", async (req, res) => {
    try {
        const { tid } = req.body;
        const result = await inquiryPayment(tid);
        res.json(result);
    } catch (err) {
        console.log("🚀 ~ err:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
