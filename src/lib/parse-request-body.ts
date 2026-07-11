export async function parseRequestFields(
  request: Request,
  fields: string[]
): Promise<{ values: Record<string, string>; formSubmit: boolean }> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}));
    const values: Record<string, string> = {};
    for (const field of fields) {
      values[field] = String((body as Record<string, unknown>)[field] ?? '').trim();
    }
    return { values, formSubmit: false };
  }

  const form = await request.formData();
  const values: Record<string, string> = {};
  for (const field of fields) {
    values[field] = String(form.get(field) ?? '').trim();
  }
  return { values, formSubmit: true };
}
