# アーキテクチャ

クリーンアーキテクチャの原則に従い、依存関係は外側から内側への一方向のみです。

```
Presentation → UseCase → Domain ← Infrastructure
```

- **Domain層**: 外部ライブラリに依存しない純粋なビジネスロジック
- **UseCase層**: ドメイン層のインターフェースのみに依存
- **Infrastructure層**: TypeORM等の具体的な技術を使ったGateway実装（依存性逆転の原則）
- **Presentation層**: GraphQLリゾルバーがユースケースを呼び出す

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

## 命名規則

- **UseCase**: `User` + アクション名（`UserIndex`, `UserShow`, `UserCreate`, `UserUpdate`, `UserDelete`）
- **Gateway**: ドメイン層の `UserRepository` インターフェースに対する実装を `UserGateway` と命名。クリーンアーキテクチャ原典の「Gateway」に準拠し、インターフェース（Domain層）と実装（Infrastructure層）が別レイヤーであることを明示
