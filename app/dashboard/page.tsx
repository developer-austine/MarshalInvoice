import { requireUser } from "../utils/hooks"
import { signOutAction } from "./actions"

export default async function DashboardRoute() {
    const session = await requireUser

    return(
        <div>
            <h1>Dashboard</h1>
            <form action={signOutAction}>
                <button type="submit">Sign Out</button>
            </form>
        </div>
    )
}