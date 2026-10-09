"use client";

import { useState, type FormEvent } from "react";
import { footer } from "@/content/site";
import s from "./footer.module.css";

const N = footer.newsletter;

// Newsletter sign-up: checks the address and says thanks (not yet connected to a mailing service)
export default function Newsletter() {
  const [msg, setMsg] = useState<{ text: string; err?: boolean } | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const v = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setMsg({ text: N.invalid, err: true });
      return;
    }
    setMsg({ text: N.thanks });
    input.value = "";
  };

  return (
    <div className={s.news}>
      <p id="news-h" className={s.newsTitle}>
        {N.title}
      </p>
      <form className={s.form} noValidate onSubmit={submit} aria-labelledby="news-h">
        <label className="sr-only" htmlFor="news-email">
          {N.label}
        </label>
        <input id="news-email" name="email" type="email" placeholder={N.placeholder} autoComplete="email" />
        <button type="submit">{N.button}</button>
      </form>
      <p className={s.formMsg} data-err={msg?.err || undefined} role="status">
        {msg?.text ?? ""}
      </p>
    </div>
  );
}
