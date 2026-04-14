import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ 
      backgroundColor: 'var(--background)', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  )
}