import { DashboardHeader } from "../(main)/_components/dashboard/dashboard-header"
import { DashboardShell } from "../(main)/_components/dashboard/dashboard-shell"
import { StatsCards } from "../(main)/_components/dashboard/stats-cards"
import { RecentProjects } from "../(main)/_components/dashboard/recent-projects"
import { CreateNewButton } from "../(main)/_components/dashboard/create-new-button"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col min-h-screen w-full">
        <DashboardHeader heading="Dashboard" subheading="Manage your AI video projects">
          <CreateNewButton />
        </DashboardHeader>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCards />
        </div>

        <div className="mt-6">
          <RecentProjects />
        </div>
      </div>
    </DashboardShell>
  )
}