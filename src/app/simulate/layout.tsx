import SimulatorAccessGuard from "@/components/SimulatorAccessGuard";

export default function SimulateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SimulatorAccessGuard>
      {children}
    </SimulatorAccessGuard>
  );
}
