import Input from "./Input";

const SearchTask = ({ search, setSearch }) => {
    return <div className="search-task">
        <Input type="text" id="search-input" placeholder="Search tasks" autoFocus value={search} setValue={setSearch} />
    </div>
}
export default SearchTask;