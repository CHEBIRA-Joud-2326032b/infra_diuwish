"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function depositAction(accountId: number, amount: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization");

  if (!token) {
    return { success: false, message: "Non authentifié" };
  }

  const res = await fetch(`${API_URL}/account/${accountId}/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `Authorization=${token.value}`,
    },
    body: JSON.stringify({ amount }),
  });

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

  const res = await fetch(`${API_URL}/account/${accountId}/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `Authorization=${token.value}`,
    },
    body: JSON.stringify({ amount }),
  });

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
