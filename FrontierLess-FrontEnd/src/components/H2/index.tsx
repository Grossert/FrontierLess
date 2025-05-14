interface Props {
    children?: React.ReactNode
}

export default function H2({ children }: Props) {

    return (
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{children}</h2>
    )
}
