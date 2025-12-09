const { useEffect, useState } = React;

function MessageComponent({ username, mess, date_send }) {
    return (
        <div>
            <p>{username}</p>
            <p>{mess}</p>
            <p>{date_send}</p>
        </div>
    );
}

function Chat({ match }) {
    const roomId = match.params.id;
    const [listMessager, setListMessager] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await fetch("/api/rooms/messages/get-list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "room_id": roomId
                    }
                });

                // 1. Dùng .text() để lấy nội dung
                const rawDataString = await response.text();

                // 2. Tự parse chuỗi đó thành JSON object
                // **Đây là bước bắt buộc vì Server trả về text/plain**
                const data = JSON.parse(rawDataString);

                setListMessager(data);
            } catch (err) {
                console.error("some error idk", err);
            }
        };

        fetchData();
    }, [roomId]);

    return (
        <div>
            <p>chatpae</p>
            <div>
                {listMessager?.map(item => (
                    <MessageComponent
                        key={item.id}
                        username={item.username}
                        mess={item.mess}
                        date_send={item.date_send}
                    />
                ))}
            </div>
        </div>
    );
}
