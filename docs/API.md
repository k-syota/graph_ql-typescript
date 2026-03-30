# API リファレンス

## エンドポイント

| 項目 | 値 |
|------|-----|
| URL | `http://localhost:4001` (Docker環境) / `http://localhost:4000` (ローカル) |
| メソッド | `POST` |
| Content-Type | `application/json` |
| Playground | ブラウザで上記URLにアクセス → Apollo Sandbox |

> Apollo ServerはすべてのGraphQLリクエストを単一のエンドポイント（`POST /`）で受け付けます。

## Postmanでの使い方

1. リクエストタイプを **POST** に設定
2. URLに `http://localhost:4001` を入力
3. **Body** タブ → **GraphQL** を選択
4. **QUERY** 欄にGraphQLクエリを、**GRAPHQL VARIABLES** 欄にJSON変数を入力

---

## スキーマ定義

### User

| フィールド | 型 | 説明 |
|-----------|------|------|
| `id` | `Int!` | ユーザーID（自動採番） |
| `name` | `String!` | ユーザー名（最大100文字） |
| `email` | `String!` | メールアドレス（最大255文字、ユニーク制約） |
| `createdAt` | `String!` | 作成日時（ISO 8601形式） |
| `updatedAt` | `String!` | 更新日時（ISO 8601形式） |

### DeleteResult

| フィールド | 型 | 説明 |
|-----------|------|------|
| `success` | `Boolean!` | 削除が成功したかどうか |

### CreateUserInput

| フィールド | 型 | 必須 | 説明 |
|-----------|------|------|------|
| `name` | `String!` | Yes | ユーザー名 |
| `email` | `String!` | Yes | メールアドレス |

### UpdateUserInput

| フィールド | 型 | 必須 | 説明 |
|-----------|------|------|------|
| `name` | `String` | No | ユーザー名（省略時は変更なし） |
| `email` | `String` | No | メールアドレス（省略時は変更なし） |

---

## Query

### 1. 全ユーザー取得

全ユーザーをID昇順で返します。

**QUERY:**

```graphql
query GetUsers {
  users {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

**GRAPHQL VARIABLES:** なし

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

### 2. ユーザーをID指定で取得

指定したIDのユーザーを返します。存在しない場合は `null` を返します。

**QUERY:**

```graphql
query GetUser($id: Int!) {
  user(id: $id) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

**GRAPHQL VARIABLES:**

```json
{
  "id": 1
}
```

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

**存在しないIDの場合:**

```json
{
  "data": {
    "user": null
  }
}
```

---

## Mutation

### 3. ユーザー作成

新しいユーザーを作成します。

**QUERY:**

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

**GRAPHQL VARIABLES:**

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

### 4. ユーザー更新

指定したIDのユーザー情報を更新します。`input` 内のフィールドは任意で、指定したフィールドのみ更新されます。

**QUERY:**

```graphql
mutation UpdateUser($id: Int!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
    updatedAt
  }
}
```

**GRAPHQL VARIABLES（名前のみ更新）:**

```json
{
  "id": 1,
  "input": {
    "name": "田中次郎"
  }
}
```

**GRAPHQL VARIABLES（メールのみ更新）:**

```json
{
  "id": 1,
  "input": {
    "email": "jiro@example.com"
  }
}
```

**GRAPHQL VARIABLES（名前とメール両方更新）:**

```json
{
  "id": 1,
  "input": {
    "name": "田中次郎",
    "email": "jiro@example.com"
  }
}
```

**レスポンス例:**

```json
{
  "data": {
    "updateUser": {
      "id": 1,
      "name": "田中次郎",
      "email": "jiro@example.com",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    }
  }
}
```

### 5. ユーザー削除

指定したIDのユーザーを削除します。

**QUERY:**

```graphql
mutation DeleteUser($id: Int!) {
  deleteUser(id: $id) {
    success
  }
}
```

**GRAPHQL VARIABLES:**

```json
{
  "id": 1
}
```

**レスポンス例（成功）:**

```json
{
  "data": {
    "deleteUser": {
      "success": true
    }
  }
}
```

**レスポンス例（存在しないID）:**

```json
{
  "data": {
    "deleteUser": {
      "success": false
    }
  }
}
```

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

## 動作確認の手順

Postmanで以下の順に実行すると、CRUD操作を一通り確認できます。

| 手順 | 操作 | 確認ポイント |
|------|------|------------|
| 1 | [全ユーザー取得](#1-全ユーザー取得) | 初期状態では空配列 `[]` が返る |
| 2 | [ユーザー作成](#3-ユーザー作成) | `id: 1` で作成される |
| 3 | [ID指定取得](#2-ユーザーをid指定で取得) | 作成したユーザーが取得できる |
| 4 | [ユーザー更新](#4-ユーザー更新) | `name` が変更されている |
| 5 | [全ユーザー取得](#1-全ユーザー取得) | 更新後の内容が反映されている |
| 6 | [ユーザー削除](#5-ユーザー削除) | `success: true` が返る |
| 7 | [全ユーザー取得](#1-全ユーザー取得) | 空配列 `[]` に戻る |
