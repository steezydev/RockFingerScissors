import Link from 'next/link';
import React from 'react';

interface IconLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function IconLink({ children, href, className }: IconLinkProps) {
  return (
    <Link href={href} target='_blank' className={`text-3xl ${className}`}>
      {children}
    </Link>
  );
}
