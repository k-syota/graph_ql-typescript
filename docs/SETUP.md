# セットアップ

## 前提条件

- Docker / Docker Compose がインストール済みであること

## 起動

```bash
docker compose up --build -d
```

起動後、`http://localhost:4001` でApollo Sandboxにアクセスできます。

## 停止

```bash
docker compose down
```

データも削除する場合:

```bash
docker compose down -v
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
