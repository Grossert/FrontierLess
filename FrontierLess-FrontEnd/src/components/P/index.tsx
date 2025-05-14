interface Props {
    children?: React.ReactNode,
}

export default function P({ children }: Props) {
    return (
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{children}</p>
    )
}
