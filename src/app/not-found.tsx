import { GlobalTitleUI } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

const NotFound = () => {
    const t = useTranslations("general");
    return (
        <section className="container flex items-center justify-center h-full">
            <div className="w-11/12 sm:w-96 mx-auto space-y-4 p-6 px-10 rounded-md bg-midnight border-2 border-secondary">
                <GlobalTitleUI>{t("notFound")}</GlobalTitleUI>
            </div>
        </section>
    );
};

export default NotFound;
