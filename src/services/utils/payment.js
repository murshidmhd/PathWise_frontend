import api from "../api";

/**
 * Dynamically loads the Razorpay checkout script.
 * @returns {Promise<boolean>}
 */
export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        // Check if already loaded
        if (window.Razorpay) {
            return resolve(true);
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

/**
 * Initiates a Razorpay payment flow.
 * @param {Object} options - Customization options
 * @param {number} options.amount - Amount in INR (e.g. 350)
 * @param {number} options.points - Number of SkillPoints to add
 * @param {string} options.description - Description displayed in Razorpay
 * @param {Object} options.user - User details for prefill {fullName, email}
 * @param {Function} options.onSuccess - Callback after successful payment
 */
export const handlePayment = async ({ amount, points, description, user, onSuccess }) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        return;
    }

    try {
        // Call Django API to create an order
        const { data } = await api.post("/payments/create-order/", { amount, points });

        const razorpayOptions = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: "PathWise",
            description: description || `Purchase Credits`,
            order_id: data.order_id,
            handler: async function (response) {
                try {
                    // response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature
                    // Send these to Django to verify the payment signature and add credits
                    const verificationRes = await api.post("/payments/verify-payment/", response);

                    if (verificationRes.status === 200 || verificationRes.status === 201) {
                        alert("Payment Successful! Credits added.");
                        if (onSuccess) onSuccess(response);
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                } catch (err) {
                    console.error("Verification failed:", err);
                    alert("We couldn't verify your payment. Please keep your payment ID handy.");
                }
            },
            prefill: {
                name: user?.full_name || "User",
                email: user?.email || "",
            },
            theme: { color: "#4f46e5" },
        };

        const paymentObject = new window.Razorpay(razorpayOptions);
        paymentObject.open();
    } catch (error) {
        console.error("Payment failed:", error);
        alert(error.response?.data?.detail || "Something went wrong with the payment process.");
    }
};
