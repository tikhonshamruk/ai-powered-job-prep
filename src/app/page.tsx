import { SignInButton, UserButton } from '@clerk/nextjs'

import { ModeToggle } from '@/components/mode-toggle'

export default function HomePage() {
	return (
		<>
			<SignInButton />
			<UserButton />
			<ModeToggle />
		</>
	)
}
