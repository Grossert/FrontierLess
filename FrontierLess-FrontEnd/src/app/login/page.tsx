"use client";

import FormLogin from "@/components/FormLogin";

export default function Login() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Entrar no FrontierLess</h2>
            </div>
            <FormLogin/>
        </div>
    );
}
