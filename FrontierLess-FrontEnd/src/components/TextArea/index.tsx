interface Props {
    children?: React.ReactNode,
    id: string,
    name: string,
    label?: string,
    placeholder?: string,
    value?: string,
    onChange?: any
}

export default function TextArea({ children, id, name, label, placeholder, value, onChange}: Props) {
    return (
        <>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <textarea id={id} name={name} rows={4}
                className="w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder={placeholder} value={value} onChange={onChange} required>
                {children}
            </textarea>
        </>
    )
}
