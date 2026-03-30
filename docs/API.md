# API リファレンス

## エンドポイント

| 項目 | 値 |
|------|-----|
| URL | `http://localhost:4001` (Docker環境) / `http://localhost:4000` (ローカル) |
| プロトコル | HTTP |
| メソッド | `POST` |
| Content-Type | `application/json` |
| GraphQL Playground | ブラウザで上記URLにアクセスするとApollo Sandboxが利用可能 |

> Apollo ServerはすべてのGraphQLリクエストを単一のエンドポイント（`POST /`）で受け付けます。

## リクエスト形式

すべてのリクエストは以下のJSON形式で送信します:

```json
{
  "query": "GraphQLクエリ文字列",
  "variables": { "変数名": "値" }
}
```

### curlでのリクエスト例

```bash
curl -X POST http://localhost:4001 \
  -H "Content-Type: application/json" \
  -d '{"query": "{ users { id name email } }"}'
```

---

## スキーマ定義

### 型定義

#### User

| フィールド | 型 | 説明 |
|-----------|------|------|
| `id` | `Int!` | ユーザーID（自動採番） |
| `name` | `String!` | ユーザー名（最大100文字） |
| `email` | `String!` | メールアドレス（最大255文字、ユニーク制約） |
| `createdAt` | `String!` | 作成日時（ISO 8601形式） |
| `updatedAt` | `String!` | 更新日時（ISO 8601形式） |

#### DeleteResult

| フィールド | 型 | 説明 |
|-----------|------|------|
| `success` | `Boolean!` | 削除が成功したかどうか |

#### CreateUserInput

| フィールド | 型 | 必須 | 説明 |
|-----------|------|------|------|
| `name` | `String!` | Yes | ユーザー名 |
| `email` | `String!` | Yes | メールアドレス |

#### UpdateUserInput

| フィールド | 型 | 必須 | 説明 |
|-----------|------|------|------|
| `name` | `String` | No | ユーザー名（省略時は変更なし） |
| `email` | `String` | No | メールアドレス（省略時は変更なし） |

---

## Query

### `users` - 全ユーザー取得

全ユーザーをID昇順で返します。

```graphql
query {
  users {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

**レスポンス例:**

```json
{
  "data": {
    "users": [
      {
        "id": 1,
        "name": "田中太郎",
        "email": "tanaka@example.com",
        "createdAt": "2026-03-30T10:00:00.000Z",
        "updatedAt": "2026-03-30T10:00:00.000Z"
      },
      {
        "id": 2,
        "name": "山田花子",
        "email": "yamada@example.com",
        "createdAt": "2026-03-30T11:00:00.000Z",
        "updatedAt": "2026-03-30T11:00:00.000Z"
      }
    ]
  }
}
```

### `user(id)` - ユーザーをID指定で取得

指定したIDのユーザーを返します。存在しない場合は `null` を返します。

```graphql
query {
  user(id: 1) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

**引数:**

| 名前 | 型 | 必須 | 説明 |
|------|------|------|------|
| `id` | `Int!` | Yes | ユーザーID |

**レスポンス例:**

```json
{
  "data": {
    "user": {
      "id": 1,
      "name": "田中太郎",
      "email": "tanaka@example.com",
      "createdAt": "2026-03-30T10:00:00.000Z",
      "updatedAt": "2026-03-30T10:00:00.000Z"
    }
  }
}
```

**存在しない場合:**

```json
{
  "data": {
    "user": null
  }
}
```

---

## Mutation

### `createUser(input)` - ユーザー作成

新しいユーザーを作成します。

```graphql
mutation {
  createUser(input: { name: "田中太郎", email: "tanaka@example.com" }) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

**変数を使用する場合:**

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
```

```json
{
  "input": {
    "name": "田中太郎",
    "email": "tanaka@example.com"
  }
}
```

**レスポンス例:**

```json
{
  "data": {
    "createUser": {
      "id": 1,
      "name": "田中太郎",
      "email": "tanaka@example.com",
      "createdAt": "2026-03-30T10:00:00.000Z",
      "updatedAt": "2026-03-30T10:00:00.000Z"
    }
  }
}
```

### `updateUser(id, input)` - ユーザー更新

指定したIDのユーザー情報を更新します。`input` 内のフィールドは任意で、指定したフィールドのみ更新されます。

```graphql
mutation {
  updateUser(id: 1, input: { name: "田中次郎" }) {
    id
    name
    email
    updatedAt
  }
}
```

**引数:**

| 名前 | 型 | 必須 | 説明 |
|------|------|------|------|
| `id` | `Int!` | Yes | 更新対象のユーザーID |
| `input` | `UpdateUserInput!` | Yes | 更新内容 |

**レスポンス例:**

```json
{
  "data": {
    "updateUser": {
      "id": 1,
      "name": "田中次郎",
      "email": "tanaka@example.com",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    }
  }
}
```

### `deleteUser(id)` - ユーザー削除

指定したIDのユーザーを削除します。

```graphql
mutation {
  deleteUser(id: 1) {
    success
  }
}
```

**引数:**

| 名前 | 型 | 必須 | 説明 |
|------|------|------|------|
| `id` | `Int!` | Yes | 削除対象のユーザーID |

**レスポンス例:**

```json
{
  "data": {
    "deleteUser": {
      "success": true
    }
  }
}
```

> 存在しないIDを指定した場合、`success` は `false` を返します。

---

## エラーレスポンス

GraphQLのエラーは以下の形式で返されます:

```json
{
  "errors": [
    {
      "message": "User with id 999 not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["updateUser"],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR"
      }
    }
  ],
  "data": null
}
```

### 主なエラーケース

| 操作 | 条件 | エラーメッセージ |
|------|------|----------------|
| `updateUser` | 存在しないID | `User with id {id} not found` |
| `createUser` | 重複するemail | MySQLのユニーク制約違反エラー |

---

## curlリクエスト集

### 全ユーザー取得

```bash
curl -s -X POST http://localhost:4001 \
  -H "Content-Type: application/json" \
  -d '{"query": "{ users { id name email createdAt updatedAt } }"}' | jq
```

### ID指定取得

```bash
curl -s -X POST http://localhost:4001 \
  -H "Content-Type: application/json" \
  -d '{"query": "{ user(id: 1) { id name email } }"}' | jq
```

### ユーザー作成

```bash
curl -s -X POST http://localhost:4001 \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { createUser(input: { name: \"田中太郎\", email: \"tanaka@example.com\" }) { id name email } }"}' | jq
```

### ユーザー更新

```bash
curl -s -X POST http://localhost:4001 \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { updateUser(id: 1, input: { name: \"田中次郎\" }) { id name email } }"}' | jq
```

### ユーザー削除

```bash
curl -s -X POST http://localhost:4001 \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { deleteUser(id: 1) { success } }"}' | jq
```
