# 🍽️ OrderHub - React 線上訂餐平台

模擬線上訂餐平台流程的 React 練習專案，涵蓋商品展示、加入購物車、結帳與流程控制，強調模組化開發與全站狀態管理的實作。

## 🚀 技術棧

- ⚛️ React.js
- ⚡ Vite（快速開發與建構）
- 🎯 JavaScript（ES6+）
- 🧩 CSS Modules
- 🌐 react-toastify（操作提示通知）
- 🧠 Context API + useReducer
- 🔄 自訂 Hook（useHttp）

## 📁 專案結構摘要

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/            # 元件區：Header, Layout, Cart, FloatingCartButton...
│   └── meal/              # 餐點卡片與分類列
├── context/               # 全域狀態管理（CartContext, UserProgressContext）
├── hooks/                 # 自訂 Hook（useHttp）
├── UI/                    # 通用元件（ Modal）
├── pages/                 # 頁面元件（MenuPage, OrderSuccessPage）
```

## 🧠 使用到的 React 技術

### 📌 Hooks

- `useState`, `useEffect`：狀態與副作用管理
- `useContext`：購物車與流程控制狀態共享
- `useReducer`：購物邏輯集中管理（如新增、刪除、清空）
- `useRef`：控制輸入焦點或彈窗 DOM 行為

### 📌 其他

- `Context.Provider`：建立全域狀態供應器
- `react-toastify`：顯示即時提示訊息

## 🛠️ 安裝與啟動

```bash
npm install
npm run dev
```

> 需先安裝 Node.js 與 npm

## 📚 功能亮點

- 加入購物車、商品分類、總價計算
- 表單流程控制與訂單完成提示
- 使用 Modal 管理使用者互動行為
- 自訂 hook 抽離 HTTP 請求邏輯
- 彈性模組化架構，方便日後擴充

---

🔗 本專案為個人獨立練習 Side Project，歡迎參考與提出建議 🙌
