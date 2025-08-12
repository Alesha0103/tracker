import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import "@/styles/globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { QueryProvider } from "@/components/query-provider";

export const metadata: Metadata = {
    title: "Time Tracker",
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const locale = await getLocale();

    return (
        <html lang={locale}>
            <body className="bg-primary w-full h-[100dvh] flex flex-col scrollbar">
                <NextIntlClientProvider>
                    <QueryProvider>
                        <Header />
                        <main className="flex-1 flex flex-col h-fit w-full mx-auto">
                            {children}
                        </main>
                        <Footer />
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
