"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function depositAction(accountId: number, amount: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization");

  if (!token) {
    return { success: false, message: "Non authentifié" };
  }

  const res = await fetch(
    `http://localhost:8080/account/${accountId}/deposit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${token.value}`,
      },
      body: JSON.stringify({ amount }),
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return {
      success: false,
      message: errorData.message || "Erreur lors du dépôt",
    };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Dépôt effectué avec succès" };
}

export async function withdrawAction(accountId: number, amount: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization");

  if (!token) {
    return { success: false, message: "Non authentifié" };
  }

  const res = await fetch(
    `http://localhost:8080/account/${accountId}/withdraw`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${token.value}`,
      },
      body: JSON.stringify({ amount }),
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return {
      success: false,
      message: errorData.message || "Erreur lors du retrait",
    };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Retrait effectué avec succès" };
}
