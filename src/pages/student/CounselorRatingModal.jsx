import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const CounselorRatingModal = ({ isOpen, onClose, counselor, onRatingSuccess }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setSubmitting(true);
        try {
            await api.post(`/counselors/rate/${counselor.id}/`, {
                rating,
                comment,
            });
            toast.success("Feedback submitted! Thank you.");
            onRatingSuccess();
            onClose();
        } catch (err) {
            const msg = err.response?.data?.detail || "Failed to submit rating";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="relative p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <div className="text-center mb-8">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mb-4">
                            <span className="material-symbols-outlined text-4xl">star</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">Rate your Mentor</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            How was your experience with <span className="font-bold text-slate-700">{counselor.full_name}</span>?
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="transition-transform active:scale-90"
                                >
                                    <span className={`material-symbols-outlined text-4xl ${star <= (hover || rating) ? 'text-amber-400 fill-current' : 'text-slate-200'
                                        }`}>
                                        star
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Your Feedback (Optional)
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts about the session..."
                                className="w-full min-h-[120px] p-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 rounded-2xl bg-[#0B818D] text-white font-bold shadow-lg shadow-teal-500/20 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {submitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CounselorRatingModal;
