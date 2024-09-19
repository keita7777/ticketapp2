"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ToggleMode = () => {
  //useTheme は next-themes ライブラリが提供するカスタムフックで、現在のテーマ（theme）とテーマを変更するための関数（setTheme）を取得します。
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  //mounted は、コンポーネントがクライアント側でマウントされたかどうかを追跡するための状態です。useEffect によって、コンポーネントがマウントされた後に true になります。これにより、SSR（サーバーサイドレンダリング）とCSR（クライアントサイドレンダリング）の間の不一致を防ぎます。mounted を使って、テーマが正しくクライアント側で表示されるまで待つことができます。
  useEffect(() => {
    setMounted(true);
  }, []);

  //mounted が false の場合、つまりコンポーネントがまだクライアントサイドでマウントされていない場合は、空のボタンをレンダリングします。このタイミングではテーマの状態が不明確なので、UIを適切に表示しないようにしています。
  if (!mounted) {
    return <Button variant="outline" size="icon"></Button>;
  }

  //theme が "dark" の場合、dark という変数に true が代入され、ライトモードの場合は false になります。
  const dark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
    >
      {dark ? (
        <Sun className="hover:cursor-pointer hover:text-primary" />
      ) : (
        <Moon className="hover:cursor-pointer hover:text-primary" />
      )}
    </Button>
  );
};
export default ToggleMode;
