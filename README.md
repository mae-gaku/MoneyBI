<h1 align="center">MoneyBI</h1>


<p align="center">お金管理可視化ツール作成</p>

<p align="center">
  <a href="https://github.com/mae-gaku/MoneyBI/releases"><img src="https://img.shields.io/github/v/release/mae-gaku/MoneyBI?style=flat-square" alt="Version"></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square" alt="License"></a>

</p>


<p align="center">
  <img src="https://github.com/user-attachments/assets/bd93a53a-5480-487d-95b6-8b8426e98f7b" alt="MoneyBI Logo" height="300" width="700">
</p>


---

## ToDo
- [x] シンプルでモダンなデザイン
- [ ] テーブルデザイン変更
- [ ] 数値計算処理追加
- [ ] サインアップ・ログイン機能作成
- [ ] サイドバー機能修正
- [ ] データベース管理
- [ ] Webappの高速化 




---

## Setup

### 1. Clone Repository
```sh
git clone https://github.com/mae-gaku/MoneyBI.git
cd MoneyBI
```

### 2. Install Dependencies

Node.jsのバージョンアップ
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
```sh
nvm install 20
nvm use 20
```
#### プロジェクト作成
```sh
npx create-next-app my-app --typescript --app
cd my-app
```

#### インストールライブラリ
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```sh
npx shadcn@latest add dashboard-01
```

```sh
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add avatar
npx shadcn@latest add input
npx shadcn@latest add dropdown-menu
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet
npx shadcn@latest add badge
```

```sh
npm install date-fns
```


### 3. Run Application
```sh
npm run dev
```

### 4. Access
```
http://localhost:3000/
```


