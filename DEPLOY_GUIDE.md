# 歩禅 HoZen デプロイガイド 🚀

## 初めての着金までの3ステップ

---

## ステップ1: Vercel アカウント作成 & デプロイ（5分）

### 1-1. Vercel にサインアップ
1. https://vercel.com にアクセス
2. 「Sign Up」→「Continue with GitHub」をクリック
3. GitHubアカウントでログイン

### 1-2. GitHub にコードをプッシュ
```bash
cd hozen-app
git init
git add .
git commit -m "Initial commit: 歩禅 HoZen MVP"
git remote add origin https://github.com/YOUR_USERNAME/hozen-app.git
git push -u origin main
```

### 1-3. Vercel でデプロイ
1. Vercel ダッシュボードで「Add New」→「Project」
2. GitHub から「hozen-app」リポジトリを選択
3. 「Deploy」をクリック
4. 2-3分で完了。URLが発行されます（例: hozen-app.vercel.app）

---

## ステップ2: Stripe 設定（10分）

### 2-1. Stripe アカウント作成
1. https://dashboard.stripe.com/register にアクセス
2. メールアドレスとパスワードで登録
3. ビジネス情報を入力（個人事業主でOK）

### 2-2. 商品と価格を作成
1. Stripe ダッシュボード → 「商品」→「商品を追加」
2. 商品名: 「歩禅 プレミアム」
3. 価格を2つ作成:
   - **月額プラン**: ¥480/月（繰り返し → 毎月）
   - **年額プラン**: ¥3,980/年（繰り返し → 毎年）
4. 各価格の「Price ID」をメモ（price_xxx...）

### 2-3. APIキーを取得
1. ダッシュボード → 「開発者」→「APIキー」
2. 「公開可能キー」（pk_test_xxx）をメモ
3. 「シークレットキー」（sk_test_xxx）をメモ

### 2-4. Vercel に環境変数を設定
1. Vercel ダッシュボード → プロジェクト → 「Settings」→「Environment Variables」
2. 以下を追加:

| Name | Value |
|------|-------|
| STRIPE_SECRET_KEY | sk_test_xxx... |
| STRIPE_PUBLISHABLE_KEY | pk_test_xxx... |
| STRIPE_MONTHLY_PRICE_ID | price_xxx（月額） |
| STRIPE_YEARLY_PRICE_ID | price_xxx（年額） |
| STRIPE_WEBHOOK_SECRET | （次のステップで取得） |

3. 「Deployments」→ 最新のデプロイで「Redeploy」

### 2-5. Webhook を設定
1. Stripe ダッシュボード → 「開発者」→「Webhook」
2. 「エンドポイントを追加」
3. URL: `https://YOUR-APP.vercel.app/api/webhook`
4. イベント: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
5. 「署名シークレット」(whsec_xxx) を Vercel の環境変数に追加

---

## ステップ3: テスト & 本番切り替え（5分）

### テスト決済
1. アプリの「プランを見る」→「7日間無料で試す」をクリック
2. Stripe テストカード番号: `4242 4242 4242 4242`
3. 有効期限: 任意の未来の日付、CVC: 任意の3桁
4. 決済完了を確認

### 本番切り替え
1. Stripe ダッシュボード → 「テストモード」トグルをオフ
2. 本番用のAPIキーに差し替え
3. Vercel で環境変数を更新 → Redeploy

---

## 完了！初めての着金を待つ

アプリURL: `https://YOUR-APP.vercel.app`

### やることチェックリスト
- [ ] GitHub にコードをプッシュ
- [ ] Vercel でデプロイ
- [ ] Stripe アカウント作成
- [ ] 商品・価格を作成
- [ ] 環境変数を設定
- [ ] テスト決済で確認
- [ ] 本番モードに切り替え
- [ ] SNS/ブログでシェア！

### 推定所要時間: 約20分

---

## トラブルシューティング

### ビルドエラーが出る
```bash
npm run build
```
でローカルでビルドして、エラーメッセージを確認。

### Stripe決済が動かない
- 環境変数が正しく設定されているか確認
- Vercel を Redeploy したか確認
- ブラウザのコンソールでエラーを確認

### PWA としてインストールできない
- HTTPS でアクセスしているか確認（Vercel は自動でHTTPS）
- Chrome で「サイトをインストール」プロンプトが出るまで少し待つ
