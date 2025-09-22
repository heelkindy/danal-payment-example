"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const { paymentUrl } = require("../config/config");

export default function Home() {
    const router = useRouter();
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

    console.log("🚀 ~ startPayment ~ paymentUrl:", paymentUrl);

    const startPayment = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${paymentUrl}/payment/auth`, formData);
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

    const navigateToCancel = () => {
        router.push("/cancel");
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-md mx-auto'>
                <div className='text-center mb-8'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>Danal Payment Test</h1>
                    <p className='text-gray-600'>Test thanh toán Danal</p>
                </div>

                <div className='bg-white rounded-lg shadow p-6'>
                    <h2 className='text-lg font-semibold mb-4 text-gray-900'>Thông tin thanh toán</h2>

                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium mb-2 text-gray-700'>Tên sản phẩm</label>
                            <input
                                type='text'
                                name='itemName'
                                value={formData.itemName}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white'
                                placeholder='Nhập tên sản phẩm'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-2 text-gray-700'>Giá (KRW)</label>
                            <input
                                type='number'
                                name='amount'
                                value={formData.amount}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white'
                                placeholder='Nhập giá sản phẩm'
                                min='0'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-2 text-gray-700'>Mã đơn hàng</label>
                            <input
                                type='text'
                                name='orderId'
                                value={formData.orderId}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white'
                                placeholder='Nhập mã đơn hàng'
                            />
                        </div>

                        <div className='space-y-3'>
                            <button
                                type='button'
                                onClick={startPayment}
                                disabled={loading || !formData.itemName || !formData.amount}
                                className='w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium'
                            >
                                {loading ? "Đang xử lý..." : "Thanh toán ngay"}
                            </button>

                            <button
                                type='button'
                                onClick={navigateToCancel}
                                className='w-full py-3 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium'
                            >
                                Hủy giao dịch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
