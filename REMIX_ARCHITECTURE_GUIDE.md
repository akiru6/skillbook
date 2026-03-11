# SkillBooks Remix 架构与数据流指南 (Architecture & Data Flow Guide)

这份文档记录了我们在将 Vite SPA 迁移至 React Router v7 (Remix) 全栈模式时的思考过程、架构设计以及底层数据流实现，特别是针对 Step 8 的数据层改造。

## 1. 为什么我们要用 Remix (React Router v7) 的 `loader` 机制？

在之前的纯前端应用中（Vite SPA），所有的数据都是在客户端通过 `useEffect` 或者直接硬编码在组件中。

但是在 Remix 全栈架构中，我们引入了真正的**服务端数据加载**机制：`loader` 函数。
虽然目前我们使用的还是“本地 Mock 数据”（比如 `home.tsx` 中的数组）或者读取本地 `SKILL.md` 文件（没有连接 Supabase），但是**代码结构和数据流动的方式已经完全变成了全栈应用的形态**。

这为未来极大地减轻了负担：当我们要接入真正的后端（例如 Supabase 或 Cloudflare D1）时，**前端组件的代码完全不需要改动**，我们只需要修改 `loader` 函数里的逻辑即可。

## 2. 页面是如何从最外层加载到最里层组件的？（组件与路由数据流）

以首页 (`/`) 为例，我们看看页面是如何把不同层级的 Section 拼装起来的。

### 2.1 路由入口：`app/routes/home.tsx`
这是我们网站的入口页面。在 Remix 中，这个路由文件主要负责两件事：
1. **数据获取 (`loader`)**：这是**在服务端运行**的。哪怕现在里面是硬编码的数组，它也是在服务器上准备好这些数据，然后作为页面的初始状态发送给前端的。
2. **页面组装 (`Home` 组件)**：这是页面的骨架。

```tsx
// app/routes/home.tsx (简化版)
export function loader() {
  return { skills: [ { id: "invoice-extraction", title: "..." } ] }; 
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // 这是注入的数据
  const { skills } = loaderData; 
  
  return (
    <main>
      <HeroSection />          {/* 顶部的介绍，没有 props */}
      <GuideContent />         {/* 纯静态的左侧使用指南 */}
      <SkillsSection skills={skills} /> {/* 将后台拿到的 skills 传给内容区！*/}
      <IdleRightPanel />       {/* 右侧的纯装饰面板 */}
    </main>
  );
}
```

### 2.2 章节组件：`SkillsSection.tsx`
`home.tsx` 把 `skills` 数组传给了 `SkillsSection`：

```tsx
// app/components/SkillsSection.tsx
export function SkillsSection({ skills }) {
  return (
    <div>
      {/* 遍历每一个 skill，生成对应的 UI 行 */}
      {skills.map((skill, index) => (
         // React Router 的 <Link> 标签，用于跳转到对应的详情页
         <Link to={`/skills/${skill.id}`} key={skill.id}>
             {/* 每一行里面展示了对应的文本、作者、等。 */}
             <div className="flex...">...</div>
         </Link>
      ))}
    </div>
  )
}
```
在这里，`<Link to="/skills/invoice-extraction">` 就像以前的 `<a>` 标签，但它会在不刷新页面的前提下，触发客户端获取 `skill-detail` 的数据并进行渲染。

## 3. Step 8 动态技能详情页的实现思路 (How & Why)

**目标**：当用户点击首页的某一个 Skill（比如 `invoice-extraction`）时，弹出一个像书本一样排版的详情页面，里面包含 GitHub 下载链接和 README 内容。

### 3.1 为什么不建表（不需要远端数据库）？
正如你在需求中所说：
> “我觉得我们甚至不用建表，因为我们不是帮用户云计算云存储它们的数据... 我需要你帮我考虑的是 如何展示 以及让他们下载，让他们下载到他们本地自己运行。”

**正确的设计**：既然每个技能实际上就是一个能在本地跑的脚本，我们的“数据库”其实就是我们本地的代码库本身。我们在 `skills/` 文件夹下游许多 `.md` 文件（如 `SKILL.md`）。在 Remix 里面，**前端去读文件系统是做不到的**，但得益于我们是**全栈架构**，我们可以在后端的 `loader` 里直接调用 Node.js 的 API 去读取 `.md` 内容！

### 3.2 动态嵌套路由的工作原理
我们在 `app/routes.ts` 里定义了：
```ts
export default [
    route("/", "routes/home.tsx", [
        route("skills/:skillId", "routes/skill-detail.tsx")
    ])
] satisfies RouteConfig;
```
由于 `skill-detail.tsx` 被设置为了 `home.tsx` 的**子路由**（嵌套路由），当用户访问 `/skills/invoice-extraction` 时，React Router 会**同时渲染** `home.tsx` 和 `skill-detail.tsx`。

### 3.3 详情页的"书中抽丝"视觉流动过程

1. **用户点击**：用户在首页点击 `Invoice Extraction` 这一栏。
2. **触发 Loader（后端）**：
   - React Router 开始同时处理 `home` 和 `skill-detail`。
   - `skill-detail.tsx` 的 `loader` 此时执行，通过 `skillId` 在服务器端提取文件：
     ```tsx
     export async function loader({ params }: LoaderFunctionArgs) {
         const skillId = params.skillId; 
         const markdown = await getSkillMarkdown(skillId);
         return { skillId, markdown, githubUrl: `.../${skillId}` }; 
     }
     ```
3. **注入 Component（前端 - Overlay 遮罩）**：
   - 前端接收到数据后，`home.tsx` 会照常渲染主页框架，但在其最后的 `<Outlet />` 占位符处，会渲染出 `skill-detail.tsx`！
   - 我们在 `skill-detail` 的根节点刻意使用了 `fixed inset-0 bg-black/60` 的全屏蒙层 CSS。
   - 这样一来，新页面就像一个“模态弹窗 / Drawer”，伴随着 `animate-in slide-in-from-bottom` 的动效，完美覆盖在原来的骨架页上面，实现了“抽出书的一页”的既视感！

## 4. 总结与后续
目前 `skillbooks-remix` 已经成为了一个“基于本地文件系统和无状态 API”的全栈应用。
- 采用 **Brutalist (粗狂艺术) + KawaiiCute (可爱风)** 进行视觉冲击。
- 把繁重的逻辑隐藏在 `loader` 内侧，前端 `Home -> SkillsSection -> Link(skillId) -> SkillDetail` 形成一个完美的闭环路由。
- 采用开放生态让受众导流到你的 GitHub Repo 中 Download to Local。不再需要自行搭建昂贵的基础设施去运行 API。
