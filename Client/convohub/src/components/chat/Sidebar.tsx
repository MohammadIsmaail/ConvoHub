const Sidebar = () => {
    return (
        <div className="p-3">

            <h4>Chats</h4>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search user..."
            />

            <div className="list-group">

                <button
                    className="list-group-item list-group-item-action"
                >
                    Rahul
                </button>

                <button
                    className="list-group-item list-group-item-action"
                >
                    Aman
                </button>

            </div>

        </div>
    );
};

export default Sidebar;