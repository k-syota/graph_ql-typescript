# GraphQL CRUD - Clean Architecture

TypeScript + GraphQL + MySQL によるCRUDサンプルアプリケーション。
クリーンアーキテクチャで設計し、Docker上で動作します。

## 技術スタック

- TypeScript
- Apollo Server (GraphQL)
- TypeORM (ORM)
- MySQL 8.0
- Docker / Docker Compose
- Jest / ts-jest (テスト)

## クイックスタート

```bash
docker compose up --build -d
```

起動後、`http://localhost:4001` でApollo Sandboxにアクセスできます。

## GraphQL API

| 項目 | 値 |
|------|-----|
| エンドポイント | `POST http://localhost:4001`（Docker環境） |
| Content-Type | `application/json` |
| Playground | ブラウザで上記URLにアクセス → Apollo Sandbox |

### Query

| 操作 | シグネチャ | 説明 |
|------|-----------|------|
| 全件取得 | `users: [User!]!` | 全ユーザーをID昇順で取得 |
| ID指定取得 | `user(id: Int!): User` | 指定IDのユーザーを取得（存在しない場合 `null`） |

### Mutation

| 操作 | シグネチャ | 説明 |
|------|-----------|------|
| 作成 | `createUser(input: CreateUserInput!): User!` | ユーザーを新規作成 |
| 更新 | `updateUser(id: Int!, input: UpdateUserInput!): User!` | 指定IDのユーザーを部分更新 |
| 削除 | `deleteUser(id: Int!): DeleteResult!` | 指定IDのユーザーを削除 |

## ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| [API リファレンス](docs/API.md) | スキーマ定義・リクエスト/レスポンス例・curlコマンド集 |
| [アーキテクチャ](docs/ARCHITECTURE.md) | クリーンアーキテクチャの設計方針・ディレクトリ構成・命名規則 |
| [セットアップ](docs/SETUP.md) | 起動/停止手順・環境変数・テスト実行 |
