import { useState } from 'react'
import { ButtonSubmit } from '../../../common/components/buttons/buttonSubmit'
import { loginAccount } from '../loginAccount'

export function LoginForm(): JSX.Element {
  const [formState, setFormState] = useState({
    name: '',
    password: '',
  })

  const handleSubmit = async () => {
    loginAccount({
      name: formState.name,
      password: formState.password,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="form-control rounded-lg bg-base-200 py-6 px-12 shadow-lg"
        onSubmit={async (e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="select-none text-center text-3xl font-bold text-primary">
          <span>GOAT</span>
          <span className="text-base-content">ify</span>
        </div>
        <div className="divider my-2" />
        <div aria-label="Nom d'utilisateur" className="form-control mb-2">
          <label className="label">
            <span className="label-text">Nom d'utilisateur</span>
          </label>
          <input
            className="input input-bordered"
            value={formState.name}
            onChange={(e): void => {
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }}
            required={true}
            type="text"
          />
        </div>

        <div aria-label="Mot de passe" className="form-control mb-2">
          <label className="label">
            <span className="label-text">Mot de passe</span>
          </label>
          <input
            className="input input-bordered"
            value={formState.password}
            onChange={(e): void => {
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }}
            required={true}
            type="password"
          />
        </div>

        <ButtonSubmit className="mt-4" label="Connexion" />
      </form>
    </div>
  )
}
