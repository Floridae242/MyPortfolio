import urllib.request
import urllib.error
import json

SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZ2VvZ2FoaGF0eWJubGhtZ2J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5NTE0OCwiZXhwIjoyMDkyMjcxMTQ4fQ.tOap3UMeUzmpy--Gwa_AJ7ZiYc96JoidQ6mOztYETDw"

headers = {
    'apikey': SERVICE_KEY,
    'Authorization': f'Bearer {SERVICE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates'
}

from scripts.migrateToSupabase import projects, certs, awards, activities

def upsert_data(table, data, conflict_col=None):
    url = f'{SUPABASE_URL}/{table}'
    if conflict_col:
        url += f'?on_conflict={conflict_col}'

    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        urllib.request.urlopen(req)
        print(f"✅ {table} migrated successfully.")
    except urllib.error.HTTPError as e:
        print(f"❌ Error migrating {table}: {e.read().decode()}")

upsert_data('projects', projects, 'slug')

