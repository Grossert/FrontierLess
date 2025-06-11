// /components/Link/index.tsx
import NextLink from 'next/link';
import React from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Link({ href, children, className }: Props) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}