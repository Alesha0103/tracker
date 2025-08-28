import { Stats } from "@/components/stats/stats";

type Params = Promise<{ id: string }>;

const StatsPage = async ({ params }: { params: Params }) => {
    const { id } = await params;

    return <Stats projectId={id} />;
};

export default StatsPage;
