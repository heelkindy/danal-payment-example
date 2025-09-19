import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Fail() {
    const router = useRouter();
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        // Lấy thông tin từ URL parameters hoặc localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("orderId") || "N/A";
        const amount = urlParams.get("amount") || "N/A";
        const itemName = urlParams.get("itemName") || "N/A";
        const errorMessage = urlParams.get("error") || "Thanh toán không thành công";

        setPaymentData({
            orderId,
            amount,
            itemName,
            errorMessage,
        });
    }, []);

    const handleRetryPayment = () => {
        router.push("/");
    };

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-red-50 to-rose-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md mx-auto'>
                {/* Error Header */}
                <div className='text-center mb-8'>
                    <div className='mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-500 mb-6'>
                        <svg className='h-10 w-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                        </svg>
                    </div>
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>Thanh toán thất bại</h1>
                    <p className='text-lg text-gray-600'>Đã xảy ra lỗi trong quá trình thanh toán</p>
                </div>

                {/* Error Card */}
                <div className='bg-white rounded-2xl shadow-xl p-8 mb-6'>
                    <div className='text-center mb-6'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4'>
                            <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                                ></path>
                            </svg>
                        </div>
                        <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Rất tiếc!</h2>
                        <p className='text-gray-600'>Giao dịch của bạn không thể được xử lý</p>
                    </div>

                    {/* Error Message */}
                    {paymentData && (
                        <div className='bg-red-50 border border-red-200 rounded-xl p-6 mb-6'>
                            <div className='flex'>
                                <div className='flex-shrink-0'>
                                    <svg className='h-6 w-6 text-red-500' viewBox='0 0 20 20' fill='currentColor'>
                                        <path
                                            fillRule='evenodd'
                                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </div>
                                <div className='ml-3'>
                                    <h3 className='text-lg font-semibold text-red-800'>Lỗi thanh toán</h3>
                                    <div className='mt-2 text-sm text-red-700'>
                                        <p>{paymentData.errorMessage}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Information */}
                    {paymentData && (
                        <div className='bg-gray-50 rounded-xl p-6'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                                <svg className='w-5 h-5 mr-2 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                    ></path>
                                </svg>
                                Thông tin giao dịch
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
                                    <span className='font-semibold text-gray-900'>{paymentData.amount} KRW</span>
                                </div>
                                <div className='flex justify-between items-center py-3'>
                                    <span className='text-gray-600 font-medium'>Trạng thái:</span>
                                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800'>
                                        <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M6 18L18 6M6 6l12 12'
                                            ></path>
                                        </svg>
                                        Thất bại
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className='space-y-4'>
                    <button
                        onClick={handleRetryPayment}
                        className='w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 px-6 rounded-xl hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 font-semibold text-lg'
                    >
                        <div className='flex items-center justify-center'>
                            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                                ></path>
                            </svg>
                            Thử lại thanh toán
                        </div>
                    </button>

                    <button
                        onClick={handleBackToHome}
                        className='w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg'
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
                </div>

                {/* Help Section */}
                <div className='mt-8 text-center'>
                    <div className='bg-yellow-50 rounded-xl p-6'>
                        <div className='flex items-center justify-center mb-3'>
                            <svg className='w-6 h-6 text-yellow-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                ></path>
                            </svg>
                            <h4 className='font-semibold text-yellow-900'>Cần hỗ trợ?</h4>
                        </div>
                        <div className='text-sm text-yellow-800 space-y-2'>
                            <p>• Kiểm tra thông tin thẻ/tài khoản</p>
                            <p>• Đảm bảo số dư tài khoản đủ</p>
                            <p>• Liên hệ ngân hàng của bạn</p>
                            <p>• Gọi hotline hỗ trợ: 1900-xxxx</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
