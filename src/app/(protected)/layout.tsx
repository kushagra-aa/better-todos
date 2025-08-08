import LogoutButton from "@/components/LogoutButton";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <LogoutButton />
    </>
  );
}
