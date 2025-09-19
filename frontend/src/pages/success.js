import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Success() {
    const router = useRouter();
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        // Lấy thông tin từ URL parameters hoặc localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("orderId") || "N/A";
        const amount = urlParams.get("amount") || "N/A";
        const itemName = urlParams.get("itemName") || "N/A";

        setPaymentData({
            orderId,
            amount,
            itemName,
        });
    }, []);

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md mx-auto'>
                {/* Success Header */}
                <div className='text-center mb-8'>
                    <div className='mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500 mb-6 animate-pulse'>
                        <svg className='h-10 w-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                        </svg>
                    </div>
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>Thành công!</h1>
                    <p className='text-lg text-gray-600'>Thanh toán đã được xử lý thành công</p>
                </div>

                {/* Success Card */}
                <div className='bg-white rounded-2xl shadow-xl p-8 mb-6'>
                    <div className='text-center'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
                            <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                                ></path>
                            </svg>
                        </div>
                        <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Cảm ơn bạn!</h2>
                        <p className='text-gray-600 mb-6'>Giao dịch của bạn đã được xử lý thành công</p>
                    </div>

                    {/* Payment Information */}
                    {paymentData && (
                        <div className='bg-gray-50 rounded-xl p-6'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                                <svg
                                    className='w-5 h-5 mr-2 text-green-600'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                    ></path>
                                </svg>
                                Chi tiết giao dịch
                            </h3>
                            <div className='space-y-3'>
                                <div className='flex justify-between items-center py-3 border-b border-gray-200'>
                                    <span className='text-gray-600 font-medium'>Mã đơn hàng:</span>
                                    <span className='font-semibold text-gray-900'>{paymentData.orderId}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 border-b border-gray-200'>
                                    <span className='text-gray-600 font-medium'>Sản phẩm:</span>
                                    <span className='font-semibold text-gray-900'>{paymentData.itemName}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 border-b border-gray-200'>
                                    <span className='text-gray-600 font-medium'>Số tiền:</span>
                                    <span className='font-semibold text-green-600 text-lg'>{paymentData.amount} KRW</span>
                                </div>
                                <div className='flex justify-between items-center py-3'>
                                    <span className='text-gray-600 font-medium'>Trạng thái:</span>
                                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                                        <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M5 13l4 4L19 7'
                                            ></path>
                                        </svg>
                                        Thành công
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className='space-y-4'>
                    <button
                        onClick={handleBackToHome}
                        className='w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 font-semibold text-lg'
                    >
                        <div className='flex items-center justify-center'>
                            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                ></path>
                            </svg>
                            Quay lại trang chủ
                        </div>
                    </button>

                    <button
                        onClick={() => window.print()}
                        className='w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg'
                    >
                        <div className='flex items-center justify-center'>
                            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
                                ></path>
                            </svg>
                            In hóa đơn
                        </div>
                    </button>
                </div>

                {/* Additional Info */}
                <div className='mt-8 text-center'>
                    <div className='bg-blue-50 rounded-xl p-6'>
                        <div className='flex items-center justify-center mb-3'>
                            <svg className='w-6 h-6 text-blue-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                ></path>
                            </svg>
                            <h4 className='font-semibold text-blue-900'>Thông tin quan trọng</h4>
                        </div>
                        <div className='text-sm text-blue-800 space-y-2'>
                            <p>• Email xác nhận đã được gửi đến địa chỉ của bạn</p>
                            <p>• Hóa đơn điện tử có thể được tải về từ email</p>
                            <p>• Nếu có thắc mắc, vui lòng liên hệ hotline: 1900-xxxx</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
