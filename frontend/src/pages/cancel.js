import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
const { paymentUrl } = require("../config/config");

export default function Cancel() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        tid: "",
        amount: "",
        currency: "KRW",
        cancelType: "1", // 1: Full cancel, 2: Partial cancel
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancelPayment = async () => {
        try {
            setLoading(true);
            setResult(null);

            const response = await axios.post(`${paymentUrl}/payment/cancel`, formData);
            console.log("🚀 ~ cancelPayment ~ response:", response);

            setResult(response.data);
        } catch (err) {
            console.error(err);
            setResult({
                returncode: "ERROR",
                message: err.response?.data?.error || "Lỗi khi gọi Cancel API",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-md mx-auto'>
                <div className='text-center mb-8'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>Cancel Payment</h1>
                    <p className='text-gray-600'>Hủy giao dịch thanh toán</p>
                </div>

                <div className='bg-white rounded-lg shadow p-6 mb-6'>
                    <h2 className='text-lg font-semibold mb-4 text-gray-900'>Thông tin hủy giao dịch</h2>

                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium mb-2 text-gray-700'>Transaction ID (TID)</label>
                            <input
                                type='text'
                                name='tid'
                                value={formData.tid}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white'
                                placeholder='Nhập Transaction ID'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-2 text-gray-700'>Số tiền hủy</label>
                            <input
                                type='number'
                                name='amount'
                                value={formData.amount}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white'
                                placeholder='Nhập số tiền hủy'
                                min='0'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-2 text-gray-700'>Loại tiền tệ</label>
                            <select
                                name='currency'
                                value={formData.currency}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white'
                            >
                                <option value='KRW'>KRW (Korean Won)</option>
                                <option value='USD'>USD (US Dollar)</option>
                                <option value='EUR'>EUR (Euro)</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-2 text-gray-700'>Loại hủy</label>
                            <select
                                name='cancelType'
                                value={formData.cancelType}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white'
                            >
                                <option value='1'>Full Cancel (Hủy toàn bộ)</option>
                                <option value='2'>Partial Cancel (Hủy một phần)</option>
                            </select>
                        </div>

                        <button
                            type='button'
                            onClick={handleCancelPayment}
                            disabled={loading || !formData.tid || !formData.amount}
                            className='w-full py-3 cursor-pointer px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium'
                        >
                            {loading ? "Đang xử lý..." : "Hủy giao dịch"}
                        </button>

                        {/* Action Button */}
                        <button
                            onClick={handleBackToHome}
                            className='w-full cursor-pointer bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium'
                        >
                            Quay lại trang chủ
                        </button>
                    </div>
                </div>

                {/* Result Display */}
                {result && (
                    <div
                        className={`rounded-lg shadow p-6 mb-6 ${
                            result.returncode === "00000"
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                        }`}
                    >
                        <h3
                            className={`text-lg font-semibold mb-4 ${
                                result.returncode === "00000" ? "text-green-900" : "text-red-900"
                            }`}
                        >
                            Kết quả:
                        </h3>
                        <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                                <span className='font-medium'>Return Code:</span>
                                <span className={result.returncode === "00000" ? "text-green-700" : "text-red-700"}>
                                    {result.returncode}
                                </span>
                            </div>
                            {result.message && (
                                <div className='flex justify-between'>
                                    <span className='font-medium'>Message:</span>
                                    <span className={result.returncode === "00000" ? "text-green-700" : "text-red-700"}>
                                        {result.message}
                                    </span>
                                </div>
                            )}
                            {result.returncode === "00000" ? (
                                <p className='text-green-700 font-medium'>Hủy giao dịch thành công!</p>
                            ) : (
                                <p className='text-red-700 font-medium'>Hủy giao dịch thất bại!</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
