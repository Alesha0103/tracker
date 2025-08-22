import { Stats } from "@/components/stats/stats";
import { FC } from "react";

interface Props {
    params: { id: string };
}

const StatsPage: FC<Props> = async ({ params }) => {
    const { id } = await params;

    return <Stats projectId={id} />;
};

export default StatsPage;
