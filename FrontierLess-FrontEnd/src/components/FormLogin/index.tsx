import React, { useState } from "react";
import { login } from "@/services/authServices";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

import Button from "../Button";
import Input from "../Input";
import Link from "../Link";

export default function FormLogin() {
    const { setUser } = useUser();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlelogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            setUser(data.user);
            console.log(">>>:", data.message);
            router.push("/profile");
        } catch (error) {
            console.error(">>>:", error);
        }
    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handlelogin}>
                <Input id="email" name="email" type="email" onChange={handleChange}>Email</Input>
                <Input id="password" name="password" type="password" onChange={handleChange}>Senha</Input>
                <Button type="submit">Entrar</Button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Não possui login?
                <Link href="/register"> Cadastrar-se</Link>
            </p>
        </div>
    );
}