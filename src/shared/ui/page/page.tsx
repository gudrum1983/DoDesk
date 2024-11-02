import style from "./page.module.scss";

export default function Page({children}: {children: React.ReactNode}) {
  return <div className={style.page}>
    {children}
  </div>
}