```
root
│
├── users
│   ├── <userId_1>
│   │     ├── userId: "userId_1"
│   │     ├── displayName: "Nguyễn Trần Thiên Bảo"
│   │     ├── email: "thienbao@gmail.com"
│   │     └── createdAt: 1701872000
│   │
│   └── <userId_2>
│         ├── userId: "userId_2"
│         ├── displayName: "Bùi Thế Sơn"
│         ├── email: "theson@gmail.com"
│         └── createdAt: 1701872100
│
├── rooms
│   ├── <roomId_1>
│   │     ├── roomId: "roomId_1"
│   │     ├── name: "Phòng 1"
│   │     ├── code: "363636"
│   │     ├── ownerId: "<userId_1>"
│   │     ├── createdAt: 1701872200
│   │     └── memberCount: 2
│   │
│   └── <roomId_2>
│         ├── roomId: "roomId_2"
│         ├── name: "Phòng 2"
│         ├── code: "181818"
│         ├── ownerId: "<userId_2>"
│         ├── createdAt: 1701872250
│         └── memberCount: 3
│
├── members
│   ├── <roomId_1>
│   │     ├── <userId_1>
│   │     │     ├── userId: "userId_1"
│   │     │     ├── joinedAt: 1701872300
│   │     │     └── role: "owner"
│   │     │
│   │     └── <userId_2>
│   │           ├── userId: "userId_2"
│   │           ├── joinedAt: 1701872400
│   │           └── role: "member"
│   │
│   └── <roomId_2>
│         └── <userId_2>
│               ├── userId: "userId_1"
│               ├── joinedAt: 1701872450
│               └── role: "owner"
│
└── messages
    ├── <roomId_1>
    │     ├── <messageId_1>
    │     │     ├── messageId: "messageId_1"
    │     │     ├── senderId: "<userId_1>"
    │     │     ├── text: "123"
    │     │     └── createdAt: 1701872500
    │     │
    │     └── <messageId_2>
    │           ├── messageId: "messageId_2"
    │           ├── senderId: "<userId_2>"
    │           ├── text: "dô"
    │           └── createdAt: 1701872510
    │
    └── <roomId_2>
          └── <messageId_1>
                ├── messageId: "messageId_1"
                ├── senderId: "<userId_2>"
                ├── text: "ủa em???"
                └── createdAt: 1701872600
```