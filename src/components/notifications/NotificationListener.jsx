import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const NotificationListener = () => {
    const currentUserId = useSelector(
        (state) => state.auth.user?.user_id || state.auth.user?.id
    );

    useEffect(() => {
        if (!currentUserId) return;

        const wsUrl = `wss://localhost:8001/ws/notifications/${currentUserId}/`;
        console.log("Connecting to Notification WebSocket:", wsUrl);

        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Received notification:", data);

                // Show the toast
                toast(
                    (t) => (
                        <div className="flex flex-col">
                            <span className="font-bold text-indigo-400">{data.title}</span>
                            <span className="text-sm">{data.message}</span>
                        </div>
                    ),
                    {
                        icon: "💬",
                        duration: 5000,
                    }
                );
            } catch (error) {
                console.error("Error parsing notification:", error);
            }
        };

        ws.onclose = () => {
            console.log("Notification WebSocket closed.");
        };

        ws.onerror = (error) => {
            console.error("Notification WebSocket error:", error);
        };

        return () => {
            ws.close();
        };
    }, [currentUserId]);

    return null; // This component doesn't render anything visible
};

export default NotificationListener;
