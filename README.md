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

## ディレクトリ構成

```
src/
├── domain/                        # ドメイン層（ビジネスルール）
│   ├── entities/
│   │   └── User.ts                # ドメインエンティティ
│   └── repositories/
│       └── UserRepository.ts      # リポジトリインターフェース
├── usecase/                       # ユースケース層（アプリケーションロジック）
│   ├── UserIndexUseCase.ts        # 全件取得
│   ├── UserShowUseCase.ts         # ID指定取得
│   ├── UserCreateUseCase.ts       # 作成
│   ├── UserUpdateUseCase.ts       # 更新
│   └── UserDeleteUseCase.ts       # 削除
├── infrastructure/                # インフラ層（外部技術の実装）
│   ├── database/
│   │   └── data-source.ts         # TypeORM DataSource設定
│   ├── entities/
│   │   └── UserEntity.ts          # TypeORMエンティティ
│   └── gateways/
│       └── UserGateway.ts         # UserRepositoryの実装
├── presentation/                  # プレゼンテーション層（GraphQL）
│   └── graphql/
│       ├── schema/
│       │   └── typeDefs.ts        # スキーマ定義
│       └── resolvers/
│           └── userResolvers.ts   # リゾルバー
└── index.ts                       # エントリーポイント

test/                              # テスト（src/と同じ層構造）
├── domain/
│   └── User.test.ts
├── usecase/
│   ├── UserIndexUseCase.test.ts
│   ├── UserShowUseCase.test.ts
│   ├── UserCreateUseCase.test.ts
│   ├── UserUpdateUseCase.test.ts
│   └── UserDeleteUseCase.test.ts
├── infrastructure/
│   └── UserGateway.test.ts
└── presentation/
    └── userResolvers.test.ts
```

## セットアップ

### 前提条件

- Docker / Docker Compose がインストール済みであること

### 起動

```bash
docker compose up --build -d
```

起動後、`http://localhost:4001` でApollo Sandboxにアクセスできます。

### 停止

```bash
docker compose down
```

データも削除する場合:

```bash
docker compose down -v
```

## GraphQL API

### Query

#### 全ユーザー取得

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

#### ユーザーをID指定で取得

```graphql
query {
  user(id: 1) {
    id
    name
    email
  }
}
```

### Mutation

#### ユーザー作成

```graphql
mutation {
  createUser(input: { name: "田中太郎", email: "tanaka@example.com" }) {
    id
    name
    email
  }
}
```

#### ユーザー更新

```graphql
mutation {
  updateUser(id: 1, input: { name: "田中次郎" }) {
    id
    name
    email
  }
}
```

#### ユーザー削除

```graphql
mutation {
  deleteUser(id: 1) {
    success
  }
}
```

## 環境変数

`.env` ファイルで設定:

| 変数名 | 説明 | デフォルト値 |
|--------|------|-------------|
| DB_HOST | MySQLホスト | db |
| DB_PORT | MySQLポート | 3306 |
| DB_USER | DBユーザー名 | app_user |
| DB_PASSWORD | DBパスワード | app_password |
| DB_NAME | DB名 | graphql_db |
| PORT | サーバーポート | 4001 |

## テスト

```bash
npm test
```

各層ごとにモックで依存を分離した単体テストを実装しています。

| テスト対象 | 内容 |
|-----------|------|
| Domain | Userエンティティの生成・変更 |
| UseCase | 各ユースケースのロジック（リポジトリをモック） |
| Infrastructure | UserGatewayのCRUD操作（TypeORMをモック） |
| Presentation | GraphQLリゾルバーの呼び出し（ユースケースをモック） |

## アーキテクチャ

クリーンアーキテクチャの原則に従い、依存関係は外側から内側への一方向のみです。

```
Presentation → UseCase → Domain ← Infrastructure
```

- **Domain層**: 外部ライブラリに依存しない純粋なビジネスロジック
- **UseCase層**: ドメイン層のインターフェースのみに依存
- **Infrastructure層**: TypeORM等の具体的な技術を使ったGateway実装（依存性逆転の原則）
- **Presentation層**: GraphQLリゾルバーがユースケースを呼び出す

### 命名規則

- **UseCase**: `User` + アクション名（`UserIndex`, `UserShow`, `UserCreate`, `UserUpdate`, `UserDelete`）
- **Gateway**: ドメイン層の `UserRepository` インターフェースに対する実装を `UserGateway` と命名。クリーンアーキテクチャ原典の「Gateway」に準拠し、インターフェース（Domain層）と実装（Infrastructure層）が別レイヤーであることを明示
