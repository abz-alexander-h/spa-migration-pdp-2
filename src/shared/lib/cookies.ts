export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const encodedName = encodeURIComponent(name);
  const cookies = document.cookie.split(';');

  for (const rawCookie of cookies) {
    const cookie = rawCookie.trim();

    if (cookie.startsWith(`${encodedName}=`)) {
      return decodeURIComponent(cookie.slice(encodedName.length + 1));
    }
  }

  return null;
}

export function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === 'undefined') {
    return;
  }

  const encodedName = encodeURIComponent(name);
  const encodedValue = encodeURIComponent(value);

  document.cookie = `${encodedName}=${encodedValue}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}
