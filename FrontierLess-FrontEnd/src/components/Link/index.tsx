import NextLink from 'next/link';

interface Props {
    children?: React.ReactNode,
    href?: any
}

export default function Link({ children, href }: Props) {
    return (
        <div>
            <NextLink href={href} className="font-semibold text-emerald-600 hover:text-emerald-500">
                {children}
            </NextLink>
        </div>

    );
}