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
        <div className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-md mx-auto'>
                {/* Error Header */}
                <div className='text-center mb-6'>
                    <div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500 mb-4'>
                        <svg className='h-8 w-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>Thanh toán thất bại</h1>
                    <p className='text-gray-600'>Đã xảy ra lỗi trong quá trình thanh toán</p>
                </div>

                {/* Error Message */}
                {paymentData && (
                    <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
                        <h3 className='text-red-800 font-medium mb-2'>Lỗi:</h3>
                        <p className='text-red-700 text-sm'>{paymentData.errorMessage}</p>
                    </div>
                )}

                {/* Payment Information */}
                {paymentData && (
                    <div className='bg-white rounded-lg shadow p-6 mb-6'>
                        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Thông tin giao dịch</h2>
                        <div className='space-y-2'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Mã đơn hàng:</span>
                                <span className='font-medium'>{paymentData.orderId}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Sản phẩm:</span>
                                <span className='font-medium'>{paymentData.itemName}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Số tiền:</span>
                                <span className='font-medium'>{paymentData.amount} KRW</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Trạng thái:</span>
                                <span className='px-2 py-1 bg-red-100 text-red-800 rounded text-sm'>Thất bại</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className='space-y-3'>
                    <button
                        onClick={handleRetryPayment}
                        className='w-full cursor-pointer bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium'
                    >
                        Thử lại thanh toán
                    </button>

                    <button
                        onClick={handleBackToHome}
                        className='w-full cursor-pointer bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium'
                    >
                        Quay lại trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
}
