

// Missing at the top of useWebSocket.js:
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

export function useWebSocket(path, onMessage) {

    const token = useSelector((state) => state.auth.token);
    const wsRef = useRef(null);
    const reconnectRef = useRef(null);
    const [status, setStatus] = useState('disconnected');

    useEffect(() => {
        console.log('[WS DEBUG] token:', token, '| path:', path);
        if (!token || !path) return;

        function connect() {
            const WS_BASE = 'wss://pathwise.duckdns.org/ws';
            const wsUrl = `${WS_BASE}/${path}/?token=${token}`;

            console.log("Attempting connection to:", wsUrl); // ADD THIS TO VERIFY
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('[WS] connected:', path);
                setStatus('connected');
            };

            ws.onmessage = (e) => onMessage(JSON.parse(e.data));

            ws.onerror = (e) => console.error('[WS] error:', e);

            ws.onclose = () => {
                console.log('[WS] closed — retrying in 3s...');
                setStatus('disconnected');
                reconnectRef.current = setTimeout(connect, 3000);
            };
        }

        setStatus('connecting');
        connect();

        return () => {
            clearTimeout(reconnectRef.current);
            wsRef.current?.close();
        };
    }, [token, path]);

    const sendMessage = useCallback((data) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(data));
        }
    }, []);

    return { sendMessage, status };
}