/* export const apiFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // ✅ Берём sid из локалки, если он там есть
  const sid = localStorage.getItem('sid')

  // ✅ Готовим headers
  const headers: HeadersInit = {
    ...(options.headers || {}),
  }

  // Если нет credentials или они не подходят (например, в WebView),
  // мы подстрахуемся и добавим sid в заголовок
  if (sid) {
    headers['X-Session-Id'] = sid
  }

  const finalOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // всё равно пробуем с кукой
  }

  return fetch(url, finalOptions)
}
 */

export const apiFetch = async (
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> => {
  // Нормализуем заголовки в экземпляр Headers
  const headers = new Headers(init.headers)

  console.log('headers из apiFetch ', headers)

  // Добавляем sid из localStorage (если есть)
  if (typeof window !== 'undefined') {
    const sid = localStorage.getItem('sid')
    console.log('sid из apiFetch ', sid)
    if (sid) headers.set('X-Session-Id', sid)
  }

  // Собираем итоговые опции
  const finalInit: RequestInit = {
    ...init,
    headers,
    /* credentials: 'include',  */ // пробуем куки всегда
  }

  return fetch(input, finalInit)
}
