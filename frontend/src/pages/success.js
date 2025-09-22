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
        <div className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-md mx-auto'>
                {/* Success Header */}
                <div className='text-center mb-6'>
                    <div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500 mb-4'>
                        <svg className='h-8 w-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>Thanh toán thành công!</h1>
                    <p className='text-gray-600'>Giao dịch đã được xử lý thành công</p>
                </div>

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
                                <span className='font-medium text-green-600'>{paymentData.amount} KRW</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Trạng thái:</span>
                                <span className='px-2 py-1 bg-green-100 text-green-800 rounded text-sm'>Thành công</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <button
                    onClick={handleBackToHome}
                    className='cursor-pointer w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium'
                >
                    Quay lại trang chủ
                </button>
            </div>
        </div>
    );
}
