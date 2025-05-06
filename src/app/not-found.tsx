import './(app)/globals.css';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404 - Az oldal nem található</h1>
      <p className="mt-4 text-muted-foreground">Ellenőrizd az URL-t vagy menj vissza a főoldalra.</p>
    </div>
  );
}
