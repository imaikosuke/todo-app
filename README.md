<div id="top"></div>

# SPAのカレンダー機能付きTodoアプリケーション

![アプリケーションのサムネイル画像](https://drive.google.com/uc?export=view&id=1fHMKHMizwZkvWAsZMPnXMVJgrRg9TDe6)


## 使用技術一覧
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
<img src="https://img.shields.io/badge/-Vite-d6d6ff.svg?logo=Vite&style=flat-square">
<img src="https://img.shields.io/badge/-Typescript-000080.svg?logo=typescript&style=flat-square">
<img src="https://img.shields.io/badge/-React-1e90ff.svg?logo=react&style=flat-square">
<img src="https://img.shields.io/badge/-TailwindCSS-4169e1.svg?logo=TailwindCSS&style=flat-square">
<img src="https://img.shields.io/badge/-Jest-b22222.svg?logo=Jest&style=flat-square">
<img src="https://img.shields.io/badge/-Testing%20Library-800000.svg?logo=testing%20library&style=flat-square">
<img src="https://img.shields.io/badge/-Firebase-ffa500.svg?logo=firebase&style=flat-square">
<img src="https://img.shields.io/badge/-GitHub%20Actions-333333.svg?logo=github%20actions&style=flat-square">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

<!-- プロジェクトについて -->
## プロジェクトについて
- Googleアカウントによるログイン
- タスクの追加・削除・編集
- カテゴリー機能
- カレンダー表示

  <br />

<!-- 環境について -->
## 環境
| 言語・フレームワーク | バージョン |
| ----------------------------- | ---------- |
| Vite                          | 5.1.1      |
| Node.js                       | 20.10.0    |
| TypeScript                    | 5.3.3      |
| React                         | 18.2.0     |
| TailwindCSS                   | 3.4.1      |
| Firebase                      | 10.8.0     |
| Jest                          | 29.7.0     |
| @testing-library/react        | 14.2.1     |

※各バージョンはメジャーバージョンまでの挙動を保証しています

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
```
❯ tree -a -I "node_modules|.next|.git|.firebase|dist" -L 2
.
├── .env
├── .eslintrc.cjs
├── .firebaserc
├── .github
│   └── workflows
├── .gitignore
├── README.md
├── components.json
├── firebase.json
├── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── AppRouter.tsx
│   ├── app
│   ├── assets
│   ├── components
│   ├── firebase.ts
│   ├── interface.ts
│   ├── lib
│   ├── main.tsx
│   ├── pages
│   ├── setupTests.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.test.json
└── vite.config.ts

10 directories, 24 files
```

## 開発環境構築

### Firebaseとの連携
Firebaseでプロジェクトと.envファイルを作成して以下の環境変数を設定

```
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx
VITE_FIREBASE_MEASUREMENT_ID=xxxxx
```

### 動作確認

モジュールをインストール
```
npm install
```

ローカルサーバーを起動
```
npm run dev
```

http://localhost:5173/ にアクセス

<p align="right">(<a href="#top">トップへ</a>)</p>