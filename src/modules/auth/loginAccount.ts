import { signIn } from 'next-auth/react'
import router from 'next/router'
import { toast } from 'react-toastify'

export const loginAccount = async ({
  name,
  password,
}: {
  name: string
  password: string
}): Promise<void> => {
  const response = await signIn('credentials', {
    redirect: false,
    name,
    password,
  })

  if (response?.error) {
    if (response.error.includes('User not found')) {
      toast.error("Nom d'utilisateur invalide")
    } else if (response.error.includes('Invalid password')) {
      toast.error('Mot de passe invalide')
    } else if (
      response.error.includes(
        'Please make sure your database server is running at'
      )
    ) {
      toast.error('Erreur de connexion à la base de données')
    } else {
      toast.error('Erreur inconnue : ' + response.error)
    }

    return
  }

  router.push(response?.url ?? '/')
  toast.success(`Connexion réussie`)
}
