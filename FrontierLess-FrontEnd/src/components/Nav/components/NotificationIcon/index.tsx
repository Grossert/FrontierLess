"use client";
import { useState, useEffect, useRef } from 'react';
import { getNotification } from '@/services/notificationService';

export default function NotificationIcon() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (showNotifications && notifications.length === 0) {
                const res = await getNotification();
                const messages = res?.notifications?.map((mes: any) => mes.message) || [];
                setNotifications(messages)
            }
        };
        fetchNotifications();
    }, [showNotifications, notifications]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    return (
        <div className="relative" ref={notificationRef}>
            <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={toggleNotifications}
            >
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
            </button>

            {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10 max-h-52 overflow-y-auto">
                    {notifications.length > 0 ? (
                        <ul>
                            {notifications.map((message, index) => (
                                <li key={index} className="py-1 border-b last:border-none text-gray-700">
                                    {message}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Nenhuma notificação encontrada</p>
                    )}
                </div>
            )}
        </div>
    );
}
