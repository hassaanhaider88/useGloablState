## 🌍 useGlobalState — React Global State in 1 Line

> Zero-config, lightweight, and blazing fast global state management for React using hooks. No context. No boilerplate. No Redux.

---

## 🚀 Why useGlobalState?

✅ **No setup required**  
✅ **Share state between components instantly**  
✅ **Works without Context API**  
✅ **Only 1 import to rule them all**  
✅ **Less than 1KB gzipped**

---

## 📦 Installation

```bash
# Using npm
npm install @hmk_codeweb88/useglobalstate

# OR using yarn
yarn add @hmk_codeweb88/useglobalstate
````

---

## ⚙️ Basic Usage

### ✅ Create a global variable in any component:

```js
import { useGlobalState } from "@hmk_codeweb88/useglobalstate";

function ComponentA() {
  const [count, setCount] = useGlobalState("count", 0); // "count" is key, 0 is initial value

  return (
    <div>
      <h2>Component A</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

### ✅ Access the same state in another component:

```js
import { useGlobalState } from "@hmk_codeweb88/useglobalstate";

function ComponentB() {
  const [count] = useGlobalState("count");

  return (
    <div>
      <h2>Component B</h2>
      <p>Global Count from Component A: {count}</p>
    </div>
  );
}
```

🧠 **No need to pass props or use context** — state is shared automatically using an internal map.

---

## 🧩 Full Example (Copy-Paste Ready)

```jsx
// App.js
import React from "react";
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";

export default function App() {
  return (
    <div>
      <ComponentA />
      <ComponentB />
    </div>
  );
}
```

```jsx
// ComponentA.js
import { useGlobalState } from "@hmk_codeweb88/useglobalstate";

export default function ComponentA() {
  const [value, setValue] = useGlobalState("sharedMessage", "Hello from A!");

  return (
    <div>
      <h2>Component A</h2>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
```

```jsx
// ComponentB.js
import { useGlobalState } from "@hmk_codeweb88/useglobalstate";

export default function ComponentB() {
  const [value] = useGlobalState("sharedMessage");

  return (
    <div>
      <h2>Component B</h2>
      <p>Received: {value}</p>
    </div>
  );
}
```

---

## ⚡ Advanced Usage

### ✅ Update value using a function:

```js
const [count, setCount] = useGlobalState("count", 0);

setCount(prev => prev + 5); // Works like useState
```

---

## 🧠 How It Works

Internally, this library uses:

* A global `Map` to store key-value pairs
* `Set` of listener functions to trigger re-renders
* React `useEffect` + `useState` to subscribe/unsubscribe to changes

That’s it. No provider, no context.

---

## ❓FAQ

### Q: Do I need a context provider?

**A:** Nope. It works completely without React context.

### Q: Is it reactive? Will it update automatically?

**A:** Yes! Any component using `useGlobalState` will re-render on change.

### Q: What happens if I access the same key in 10 components?

**A:** All 10 stay in sync, just like magic.

---

## 🧪 Roadmap

* [x] Basic key-value global store
* [ ] Devtools logging
* [ ] Persistence via localStorage
* [ ] TypeScript support

---

## 🧑‍💻 Author

Built with ❤️ by [Hassaan Haider](https://hassaan-haider.netlify.app/)
Have suggestions or ideas? PRs and issues are welcome!

---

## 📜 License

MIT © [Hassaan Haider](https://github.com/hassaanhaider88)
