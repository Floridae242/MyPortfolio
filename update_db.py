import os
import urllib.request
import urllib.error
import json

SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

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

