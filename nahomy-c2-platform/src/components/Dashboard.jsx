import Sidebar from './Sidebar'
import KPICards from './KPICards'
import ChartSection from './ChartSection'
import AuditLogsTable from './AuditLogsTable'
import Chatbot from './Chatbot'

export default function Dashboard({ onLogout }) {
  return (
    <div className="flex h-screen overflow-hidden bg-c2-dark">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-xl font-bold text-c2-text-bright tracking-tight">
              Panel de Control
            </h1>
            <p className="text-sm text-c2-text-dim mt-0.5">
              Monitoreo y gestión de operaciones de ciberseguridad
            </p>
          </div>

          <KPICards />

          <ChartSection />

          <AuditLogsTable />
        </div>
      </main>

      <Chatbot />
    </div>
  )
}
