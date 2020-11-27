import React, { ReactChildren, ReactNode } from 'react';
import Head from 'next/head';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container mx-auto max-w-5xl px-4 pt-24'>{children}</main>
    </>
  );
};
export default Layout;
