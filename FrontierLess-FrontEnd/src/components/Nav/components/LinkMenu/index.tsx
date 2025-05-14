import NextLink from 'next/link';

interface Props {
    children?: React.ReactNode,
    href?: any
}

export default function LinkMenu({ children, href }: Props) {
    return (
        <>
            <NextLink href={href} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-900">
                {children}
            </NextLink>
        </>

    );
}