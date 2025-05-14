import { useState } from "react";
import { useRouter } from "next/navigation";
//Service
import { createUser } from "@/services/userServices"
import { login } from "@/services/authServices";
//Context
import { useUser } from "@/contexts/UserContext";
//Components
import Input from "../Input";
import Button from "../Button";
import Link from "../Link";

export default function FormRegister() {
    const { setUser } = useUser();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        birthdate: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const register = await createUser(formData);
            console.log("User registered successfully:", register);
            const lgn = await login(formData);
            setUser(lgn.user);
            router.push("/profile");
        } catch (error) {
            console.error(error);
        }
    };





    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange}>Nome</Input>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange}>Email</Input>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange}>Senha</Input>
                <Input id="confirmpassword" name="confirmpassword" type="password" value={formData.confirmpassword} onChange={handleChange}>Confirme a senha</Input>
                <Input id="birthdate" name="birthdate" type="date" value={formData.birthdate} onChange={handleChange}>Data de nascimento</Input>

                <Button type="submit">Cadastrar-se</Button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Já possui conta?
                <Link href="/login"> Ir para Login</Link>
            </p>
        </div>
    );
}
