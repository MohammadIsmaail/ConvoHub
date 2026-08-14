const MessageContainer = () => {
    return (
        <div
            className="flex-grow-1 p-3"
            style={{
                height: "calc(100vh - 140px)",
                overflowY: "auto"
            }}
        >

            <div className="mb-3 text-start">
                <span className="badge text-bg-secondary">
                    Hello
                </span>
            </div>

            <div className="mb-3 text-end">
                <span className="badge text-bg-primary">
                    Hi
                </span>
            </div>

        </div>
    );
};

export default MessageContainer;