import type { Metadata } from "next";
// import { NextIntlClientProvider } from "next-intl";
// import { getLocale, getMessages } from "next-intl/server";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Time Tracker",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const locale = await getLocale();
    // const messages = await getMessages();

    return (
        <html lang={"en"}>
            <body className="bg-primary w-full h-[100dvh] flex flex-col scrollbar">
                {/* <NextIntlClientProvider messages={messages}> */}
                {children}
                {/* </NextIntlClientProvider> */}
            </body>
        </html>
    );
}
