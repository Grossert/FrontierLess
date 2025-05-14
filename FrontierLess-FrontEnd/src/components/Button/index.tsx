interface Props {
    children?: React.ReactNode,
    type: "button" | "submit" | "reset" | undefined,
    onClick?: () => void;
}

export default function Button({ type, children, onClick }: Props) {
    return (
        <button type={type} onClick={onClick} className="flex mt-1 w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {children}
        </button>
    )
}
