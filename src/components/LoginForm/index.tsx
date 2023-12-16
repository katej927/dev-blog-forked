import Link from 'next/link'

const LoginForm = () => {
  return (
    <div>
      <div>
        <h1>Enter the details</h1>

        <form>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>

          <div style={{ color: 'red' }}>Error message</div>
          <Link href={'/register'}>
            Don&apos;t have an account? <span>Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
