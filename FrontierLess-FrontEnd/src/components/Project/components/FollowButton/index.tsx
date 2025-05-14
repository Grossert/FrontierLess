
export default function FollowButton() {

    const followProject = () => {
        //TO DO
    }

    return (
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between border-b border-gray-900/10">
            <button type="button" onClick={followProject} className="text-sm bg-transparent hover:text-red-700 text-red-500 py-2 px-4 mb-4 md:mb-0 md:mr-4">
                Seguir Projeto
            </button>
        </div>

    )
}
