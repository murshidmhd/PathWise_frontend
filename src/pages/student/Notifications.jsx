import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, CheckCircle2, CreditCard, Info, AlertCircle, ShoppingBag, ArrowLeft, MoreVertical, Trash2 } from 'lucide-react';
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
            default: return <Bell className="size-5 text-slate-400" />;
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group relative flex gap-4 rounded-[24px] border p-4 transition-all hover:bg-slate-50 ${notification.is_read ? 'border-slate-100 opacity-75' : 'border-indigo-100 bg-indigo-50/30'
                }`}
        >
            <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${notification.is_read ? 'bg-slate-100 text-slate-400' : 'bg-white shadow-sm ring-1 ring-indigo-50'
                }`}>
                {getIcon(notification.type)}
            </div>

            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-bold ${notification.is_read ? 'text-slate-600' : 'text-slate-900'}`}>
                        {notification.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">
                        {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    {notification.message}
                </p>
                <div className="pt-2 flex items-center gap-3">
                    {!notification.is_read && (
                        <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="text-[11px] font-black tracking-widest text-indigo-600 uppercase hover:text-indigo-700"
                        >
                            Mark as read
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(notification.id)}
                        className="text-[11px] font-black tracking-widest text-slate-400 uppercase hover:text-rose-500"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {!notification.is_read && (
                <div className="absolute right-4 top-1/2 mt-4 size-2 -translate-y-1/2 rounded-full bg-indigo-600" />
            )}
        </motion.div>
    );
};

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([
        // Mock data for initial view
        {
            id: 1,
            type: 'payment',
            title: 'Credits Added Successfully',
            message: 'Your purchase of 10 Career Credits was successful. You can now use them to generate custom roadmaps!',
            created_at: new Date().toISOString(),
            is_read: false
        },
        {
            id: 2,
            type: 'system',
            title: 'New Feature: AI Insights',
            message: 'We\'ve added advanced AI insights to your career roadmap. Explore your path in more detail now.',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            is_read: false
        },
        {
            id: 3,
            type: 'career',
            title: 'Assessment Recommendation',
            message: 'Based on your latest activity, we recommend looking into "Data Analytics" as a potential path.',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            is_read: true
        }
    ]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Fetch real notifications here
        // api.get("/notifications/").then(res => setNotifications(res.data));
    }, []);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        // api.post("/notifications/mark_all_read/");
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        // api.delete(`/notifications/${id}/`);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        // api.patch(`/notifications/${id}/read/`);
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.is_read;
        return true;
    });

    return (
        <div className="min-h-screen bg-page-bg px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            to="/student/dashboard"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B818D] transition hover:text-[#07606a]"
                        >
                            <ArrowLeft className="size-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Notifications</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={markAllAsRead}
                            className="rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm border border-slate-200 transition hover:bg-slate-50 active:scale-95"
                        >
                            Mark all as read
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm overflow-x-auto">
                    {['all', 'unread', 'system', 'payment'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`rounded-xl px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all ${filter === f
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                    : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Notification List */}
                <div className="space-y-4">
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
                                className="flex flex-col items-center justify-center rounded-[40px] border border-dashed border-slate-300 bg-slate-50/50 py-20 text-center"
                            >
                                <div className="flex size-20 items-center justify-center rounded-[32px] bg-white shadow-sm ring-1 ring-slate-200">
                                    <BellOff className="size-10 text-slate-300" />
                                </div>
                                <h3 className="mt-6 text-xl font-black tracking-tight text-slate-900">No Notifications</h3>
                                <p className="mt-2 max-w-xs text-sm font-bold text-slate-500">
                                    You're all caught up! New alerts and updates will appear here.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Preferences Hint */}
                <div className="rounded-[30px] border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/50 p-6 text-center shadow-sm">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
                        <CheckCircle2 size={24} />
                    </div>
                    <h4 className="mt-4 text-sm font-black text-slate-900">Notification Settings</h4>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                        Manage how you receive alerts in your <Link to="/student/profile" className="text-indigo-600 underline">Profile Settings</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
