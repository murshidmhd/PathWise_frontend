import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, CheckCircle2, CreditCard, Info, AlertCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Icon = ({ name, className = "" }) => (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'payment': return <CreditCard className="size-5 text-emerald-500" />;
            case 'system': return <Info className="size-5 text-indigo-500" />;
            case 'alert': return <AlertCircle className="size-5 text-rose-500" />;
            case 'career': return <ShoppingBag className="size-5 text-amber-500" />;
            case 'mentor_assignment':
            case 'mentor_request': return <CheckCircle2 className="size-5 text-[#0B818D]" />;
            case 'student_assignment': return <Bell className="size-5 text-indigo-500" />;
            default: return <Bell className="size-5 text-slate-400" />;
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group relative flex gap-5 rounded-[32px] border p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 ${notification.is_read ? 'border-slate-100 bg-white/50 opacity-80' : 'border-[#0B818D]/20 bg-white'
                }`}
        >
            <div className={`flex size-14 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${notification.is_read ? 'bg-slate-100 text-slate-400' : 'bg-teal-50 text-[#0B818D] shadow-sm'
                }`}>
                {getIcon(notification.type)}
            </div>

            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <h4 className={`text-lg font-black tracking-tight ${notification.is_read ? 'text-slate-600' : 'text-slate-950'}`}>
                            {notification.title}
                        </h4>
                        {!notification.is_read && (
                            <span className="flex size-2 rounded-full bg-[#0B818D] animate-pulse" />
                        )}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                        {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                    {notification.message}
                </p>
                <div className="pt-3 flex items-center gap-4">
                    {!notification.is_read && (
                        <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="text-[11px] font-black tracking-[0.2em] text-[#0B818D] uppercase hover:text-[#096b75] transition-colors"
                        >
                            Mark as read
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(notification.id)}
                        className="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase hover:text-rose-500 transition-colors"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/notifications/latest/");
            setNotifications(response.data);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAllAsRead = async () => {
        try {
            await api.post("/notifications/mark-all-read/");
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await api.delete(`/notifications/delete/${id}/`);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await api.post(`/notifications/read/${id}/`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.is_read;
        if (filter === 'system') return n.type === 'system';
        if (filter === 'mentors') return n.type === 'mentor_assignment' || n.type === 'mentor_request' || n.type === 'student_assignment';
        return true;
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-10">
                
                {/* Glass Header */}
                <header className="relative overflow-hidden rounded-[40px] border border-white bg-white/70 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl sm:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,129,141,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.08),transparent_40%)]" />
                    <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Link
                                to="/counselor/dashboard"
                                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#0B818D] transition hover:translate-x-[-4px]"
                            >
                                <ArrowLeft className="size-4" />
                                Dashboard
                            </Link>
                            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Alert Center</h1>
                            <p className="mt-2 text-base font-medium text-slate-500">
                                Management notifications for your student cohort.
                            </p>
                        </div>
                        <button
                            onClick={markAllAsRead}
                            className="group inline-flex items-center gap-2 rounded-[22px] bg-slate-950 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-[#0B818D] hover:shadow-xl hover:shadow-[#0B818D]/20 active:scale-95"
                        >
                            Clear all unread
                            <CheckCircle2 className="size-4" />
                        </button>
                    </div>
                </header>

                {/* Filters */}
                <div className="flex items-center gap-3 rounded-[28px] border border-slate-200/60 bg-white/50 p-2 shadow-sm backdrop-blur-md overflow-x-auto no-scrollbar">
                    {['all', 'unread', 'mentors', 'system'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`rounded-[20px] px-8 py-3 text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 ${filter === f
                                    ? 'bg-[#0B818D] text-white shadow-lg shadow-[#0B818D]/20'
                                    : 'text-slate-400 hover:bg-white hover:text-slate-600'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Notification List */}
                <div className="space-y-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <div className="size-16 animate-spin rounded-full border-4 border-[#0B818D] border-t-transparent" />
                            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Syncing alerts...</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        onMarkAsRead={markAsRead}
                                        onDelete={deleteNotification}
                                    />
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center rounded-[50px] border-2 border-dashed border-slate-200 bg-slate-50/30 py-32 text-center"
                                >
                                    <div className="flex size-24 items-center justify-center rounded-[40px] bg-white shadow-xl shadow-slate-200/50">
                                        <BellOff className="size-10 text-slate-200" />
                                    </div>
                                    <h3 className="mt-8 text-2xl font-black tracking-tight text-slate-900">Zero Blockers</h3>
                                    <p className="mt-2 max-w-xs text-sm font-bold text-slate-400">
                                        You&apos;re completely up to date. New student updates will arrive here.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
