import { useState } from "react";
import { COUNTRIES } from "@/lib/countries";

const field =
  "mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson";

export function CountrySelect({
  name = "country",
  required = false,
  id = "country",
}: {
  name?: string;
  required?: boolean;
  id?: string;
}) {
  const [value, setValue] = useState("");
  const [other, setOther] = useState("");
  const isOther = value === "__other";

  return (
    <div>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={field}
      >
        <option value="" disabled>
          Select your country
        </option>
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.name}>
            {c.name}
          </option>
        ))}
        <option value="__other">Other…</option>
      </select>

      {isOther && (
        <input
          type="text"
          value={other}
          required={required}
          maxLength={100}
          placeholder="Type your country"
          onChange={(e) => setOther(e.target.value)}
          className={field}
          aria-label="Your country"
        />
      )}

      <input
        type="hidden"
        name={name}
        value={isOther ? other.trim() : value}
      />
    </div>
  );
}
