import ApplicationDetail from '@/components/admin/ApplicationDetail';
export default function Page({ params }: { params: { id: string } }) {
  return <ApplicationDetail id={params.id} />;
}
