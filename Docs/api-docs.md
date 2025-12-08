## Mục Lục (Table of Contents)

* [**1.Users (Người dùng)**](#1--users-người-dùng)
    * [1.1. Lấy thông tin User (Get User)](#11-lấy-thông-tin-user)
    * [1.2. Tạo User mới (Add User)](#12-tạo-user-mới)
    * [1.3. Lấy danh sách Users (Get List)](#13-lấy-danh-sách-users)
* [**2.Rooms (Phòng chat)**](#2--rooms-phòng-chat)
    * [2.1. Lấy thông tin Room (Get Room)](#21-lấy-thông-tin-room)
    * [2.2. Tạo Room mới (Add Room)](#22-tạo-room-mới)
    * [2.3. Lấy danh sách Rooms (Get List)](#23-lấy-danh-sách-rooms)
* [**3. Members (Thành viên)**](#3--members-thành-viên)
    * [3.1. Lấy thông tin Member (Get Member)](#31-lấy-thông-tin-member)
    * [3.2. Thêm Member vào Room (Add Member)](#32-thêm-member-vào-room)
    * [3.3. Lấy danh sách Members (Get List)](#33-lấy-danh-sách-members)
* [**4. Messages (Tin nhắn)**](#4--messages-tin-nhắn)
    * [4.1. Lấy thông tin Message (Get Message)](#41-lấy-thông-tin-message)
    * [4.2. Gửi Message (Add Message)](#42-gửi-message-thêm-tin-nhắn)
    * [4.3. Lấy danh sách Messages (Get List)](#43-lấy-danh-sách-messages)

---

# API Documentation

Tài liệu hướng dẫn sử dụng API cho hệ thống HotCafe.

  * **Base URL:** `/api`
  * **Content-Type:** `application/json`
  * **Time format:** Các trường thời gian (`createdAt`, `joinedAt`) sử dụng kiểu `long` (Unix Timestamp - mili-giây hoặc giây tùy logic server).

## 1\. Users (Người dùng)

### 1.1. Lấy thông tin User

Lấy chi tiết thông tin của một người dùng dựa trên `user_id`.

  * **URL:** `/users/get`
  * **Method:** `POST`
  * **Headers:**

| Key       | Type   | Required | Description                         |
|:----------|:-------|:---------|:------------------------------------|
| `user_id` | string | **Yes**  | ID của người dùng cần lấy thông tin |

  * **Example Request:**

<!-- end list -->

```javascript
fetch("/api/users/get", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "user_id": "user_12345"
    }
});
```

  * **Success Response:**

<!-- end list -->

```json
{
    "userId": "user_12345",
    "displayName": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "createdAt": 1709251200000
}
```

### 1.2. Tạo User mới

Thêm một người dùng mới vào hệ thống.

  * **URL:** `/users/add`
  * **Method:** `POST`
  * **Body (JSON):**

| Key           | Type   | Description                                           |
|:--------------|:-------|:------------------------------------------------------|
| `userId`      | string | ID duy nhất của user (thường là UID từ Firebase Auth) |
| `displayName` | string | Tên hiển thị                                          |
| `email`       | string | Địa chỉ email                                         |
| `createdAt`   | long   | Thời gian tạo (Timestamp)                             |

  * **Example Body:**

<!-- end list -->

```json
{
    "userId": "user_12345",
    "displayName": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "createdAt": 1709251200000
}
```

  * **Response:** `true` (Thành công) hoặc `false` (Thất bại).

### 1.3. Lấy danh sách Users

Lấy toàn bộ danh sách người dùng trong hệ thống.

  * **URL:** `/users/get-list`
  * **Method:** `POST`
  * **Response:** Trả về một JSON Object chứa danh sách các users.

-----

## 2\. Rooms (Phòng chat)

### 2.1. Lấy thông tin Room

  * **URL:** `/rooms/get`
  * **Method:** `POST`
  * **Headers:**

| Key       | Type   | Required | Description          |
|:----------|:-------|:---------|:---------------------|
| `room_id` | string | **Yes**  | ID của phòng cần lấy |

  * **Success Response:**

<!-- end list -->

```json
{
    "roomId": "room_abc123",
    "name": "Nhóm Học Tập .NET",
    "code": "NET2025",
    "ownerId": "user_12345",
    "createdAt": 1709251200000,
    "memberCount": 5
}
```

### 2.2. Tạo Room mới

  * **URL:** `/rooms/add`
  * **Method:** `POST`
  * **Body (JSON):**

| Key           | Type   | Description                 |
|:--------------|:-------|:----------------------------|
| `roomId`      | string | ID duy nhất của phòng       |
| `name`        | string | Tên phòng chat              |
| `code`        | string | Mã tham gia (Invite code)   |
| `ownerId`     | string | ID của người tạo phòng      |
| `createdAt`   | long   | Thời gian tạo               |
| `memberCount` | int    | Số lượng thành viên ban đầu |

  * **Example Body:**

<!-- end list -->

```json
{
    "roomId": "room_abc123",
    "name": "Nhóm Học Tập .NET",
    "code": "NET2025",
    "ownerId": "user_12345",
    "createdAt": 1709251200000,
    "memberCount": 1
}
```

  * **Response:** `true` / `false`

### 2.3. Lấy danh sách Rooms

  * **URL:** `/rooms/get-list`
  * **Method:** `POST`
  * **Response:** JSON Object chứa danh sách tất cả các phòng.

-----

## 3\. Members (Thành viên)

### 3.1. Lấy thông tin Member

Kiểm tra thông tin một thành viên cụ thể trong một phòng.

  * **URL:** `/rooms/members/get`
  * **Method:** `POST`
  * **Headers:**

| Key       | Type   | Required | Description              |
|:----------|:-------|:---------|:-------------------------|
| `room_id` | string | **Yes**  | ID của phòng             |
| `user_id` | string | **Yes**  | ID của user cần kiểm tra |

  * **Success Response:**

<!-- end list -->

```json
{
    "userId": "user_12345",
    "joinedAt": 1709251200000,
    "role": "admin"
}
```

### 3.2. Thêm Member vào Room

  * **URL:** `/rooms/members/add`
  * **Method:** `POST`
  * **Headers:**
      * `room_id`: ID của phòng muốn thêm thành viên.
  * **Body (JSON):**

| Key        | Type   | Description                        |
|:-----------|:-------|:-----------------------------------|
| `userId`   | string | ID của user tham gia               |
| `joinedAt` | long   | Thời gian tham gia                 |
| `role`     | string | Vai trò (ví dụ: "admin", "member") |

  * **Example Request:**

<!-- end list -->

```javascript
fetch("/api/rooms/members/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "room_id": "room_abc123"
    },
    body: JSON.stringify({
        "userId": "user_999",
        "joinedAt": 1709251200000,
        "role": "member"
    })
});
```

  * **Response:** `true` / `false`

### 3.3. Lấy danh sách Members

Lấy tất cả thành viên của một phòng cụ thể.

  * **URL:** `/rooms/members/get-list`
  * **Method:** `POST`
  * **Headers:**
      * `room_id`: ID của phòng.
  * **Response:** JSON Object chứa danh sách thành viên trong phòng đó.

-----

## 4\. Messages (Tin nhắn)

### 4.1. Lấy thông tin Message

  * **URL:** `/rooms/messages/get`
  * **Method:** `POST`
  * **Headers:**

| Key          | Type   | Required | Description                |
|:-------------|:-------|:---------|:---------------------------|
| `room_id`    | string | **Yes**  | ID của phòng chứa tin nhắn |
| `message_id` | string | **Yes**  | ID của tin nhắn            |

  * **Success Response:**

<!-- end list -->

```json
{
    "messageId": "msg_xyz789",
    "senderId": "user_12345",
    "text": "Xin chào mọi người!",
    "createdAt": 1709251200000
}
```

### 4.2. Gửi Message (Thêm tin nhắn)

  * **URL:** `/rooms/messages/add`
  * **Method:** `POST`
  * **Headers:**
      * `room_id`: ID của phòng chat.
  * **Body (JSON):**

| Key         | Type   | Description              |
|:------------|:-------|:-------------------------|
| `messageId` | string | ID duy nhất của tin nhắn |
| `senderId`  | string | ID người gửi             |
| `text`      | string | Nội dung tin nhắn        |
| `createdAt` | long   | Thời gian gửi            |

  * **Example Request:**

<!-- end list -->

```javascript
fetch("/api/rooms/messages/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "room_id": "room_abc123"
    },
    body: JSON.stringify({
        "messageId": "msg_xyz789",
        "senderId": "user_12345",
        "text": "Hôm nay họp lúc mấy giờ?",
        "createdAt": 1709251200000
    })
});
```

  * **Response:** `true` / `false`

### 4.3. Lấy danh sách Messages

Lấy lịch sử tin nhắn của một phòng.

  * **URL:** `/rooms/messages/get-list`
  * **Method:** `POST`
  * **Headers:**
      * `room_id`: ID của phòng.
  * **Response:** JSON Object chứa danh sách tin nhắn.

-----
