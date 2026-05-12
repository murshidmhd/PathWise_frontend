import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const NotificationListener = () => {
    const { user, token } = useSelector((state) => state.auth);
    const currentUserId = user?.user_id || user?.id;

    useEffect(() => {
        if (!currentUserId) {
            console.log("[NotificationListener] No user ID found, skipping connection.");
            return;
        }

        // Determine the correct WS base URL
        const getWsUrl = () => {
            // Using the main domain and wss: to match the working chat socket
            return `wss://pathwise.duckdns.org/ws/notifications/${currentUserId}/`;
        };

        const wsUrl = getWsUrl() + (token ? `?token=${token}` : "");
        console.log("[NotificationListener] Attempting connection to:", wsUrl);

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log(`[NotificationListener] WebSocket Connected ✅ (User: ${currentUserId})`);
            
            // Temporary debug toast to verify UI is working
            toast.success("Notification System Connected", {
                duration: 2000,
                icon: "🔔",
                style: {
                    background: "#1e293b",
                    color: "#f8fafc",
                    border: "1px solid #334155"
                }
            });
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("[NotificationListener] Data received:", data);

                // Show the toast with a premium look
                toast(
                    (t) => (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                <span className="font-bold text-indigo-400 text-sm">
                                    {data.title || "New Message"}
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 ml-4 line-clamp-2">
                                {data.message}
                            </p>
                        </div>
                    ),
                    {
                        icon: "💬",
                        duration: 6000,
                        position: "top-right",
                    }
                );
            } catch (error) {
                console.error("[NotificationListener] Error parsing data:", error);
            }
        };

        ws.onclose = (event) => {
            console.log(`[NotificationListener] WebSocket Closed ❌ (Code: ${event.code})`);
        };

        ws.onerror = (error) => {
            console.error("[NotificationListener] WebSocket Error ⚠️", error);
        };

        return () => {
            console.log("[NotificationListener] Cleaning up connection...");
            ws.close();
        };
    }, [currentUserId, token]);

    return null;
};

export default NotificationListener;
