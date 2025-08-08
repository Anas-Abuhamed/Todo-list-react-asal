
    export default function SearchTask({search , setSearch}) {
        return <div className="search-task">
                <input type="text" id="search-input" placeholder="Search tasks" autoFocus value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
    }