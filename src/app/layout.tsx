import React from 'react';


import type {Metadata} from 'next';
import {Inter as _inter} from 'next/font/google';

import {RouteDynamic} from '@/types/next/route';


const inter = _inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'PWA with Next 14',
  description: 'PWA application with Next 14',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs14', 'next14', 'pwa', 'next-pwa'],
  authors: [
    {name: 'John Mitchell-Grant'},
    {
      name: 'John Mitchell-Grant',
      url: 'https://github.com/johnmgrant',
    },
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    {rel: 'apple-touch-icon', url: 'images/icon.png'},
    {rel: 'icon', url: 'images/icon.png'},
  ],
};

export const dynamic: RouteDynamic = 'force-dynamic';

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
