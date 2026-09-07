type DashboardRoutePageProps = {
  params: Promise<{ route: string }>
}

export default async function DashboardRoutePage({
  params,
}: DashboardRoutePageProps) {
  const { route } = await params
  const routeName = route.charAt(0).toUpperCase() + route.slice(1)

  return <div className="flex min-h-40 items-center justify-center rounded-lg border bg-card text-2xl font-semibold">{routeName}</div>
}