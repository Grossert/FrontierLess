interface Props {
    id: any,
    name: any,
    type: "password" | "text" | "date" | "email" | "number" | "time",
    children: React.ReactNode,
    value?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ id, name, type, children, value, onChange }: Props) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{children}</label>
            <div className="mt-2">
                <input id={id} name={name} type={type} required onChange={onChange} value={value} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

    )
}
