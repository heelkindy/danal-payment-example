"use client";

import { useState } from "react";
import axios from "axios";
const { paymentAuthUrl } = require("../config/config");

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        itemName: "Test Product",
        amount: 1000,
        orderId: "O123",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? parseInt(value) || 0 : value,
        }));
    };
    console.log("🚀 ~ startPayment ~ paymentAuthUrl:", paymentAuthUrl);

    const startPayment = async () => {
        try {
            setLoading(true);
            const response = await axios.post(paymentAuthUrl, formData);
            console.log("🚀 ~ startPayment ~ response:", response);
            const { start_url } = response.data;

            if (start_url) {
                window.location.href = start_url; // redirect sang trang Danal
            } else {
                alert("Không lấy được start_url!");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi khi gọi Auth API");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-8 bg-gray-100 min-h-screen'>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-2xl font-bold mb-6 text-gray-900 text-center'>Danal Payment Test</h1>

                <div className='max-w-md mx-auto'>
                    <div className='bg-white p-6 rounded border'>
                        <h2 className='text-lg font-semibold mb-4 text-gray-900'>Thông tin thanh toán</h2>

                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium mb-1 text-gray-800'>Tên sản phẩm</label>
                                <input
                                    type='text'
                                    name='itemName'
                                    value={formData.itemName}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border rounded text-gray-900 placeholder-gray-500'
                                    placeholder='Nhập tên sản phẩm'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium mb-1 text-gray-800'>Giá (KRW)</label>
                                <input
                                    type='number'
                                    name='amount'
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border rounded text-gray-900 placeholder-gray-500'
                                    placeholder='Nhập giá sản phẩm'
                                    min='0'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium mb-1 text-gray-800'>Mã đơn hàng</label>
                                <input
                                    type='text'
                                    name='orderId'
                                    value={formData.orderId}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border rounded text-gray-900 placeholder-gray-500'
                                    placeholder='Nhập mã đơn hàng'
                                />
                            </div>

                            <button
                                type='button'
                                onClick={startPayment}
                                disabled={loading || !formData.itemName || !formData.amount}
                                className='cursor-pointer w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
                            >
                                {loading ? "Đang xử lý..." : "Thanh toán ngay"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
