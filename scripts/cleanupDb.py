import urllib.request
import urllib.error
import json

SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZ2VvZ2FoaGF0eWJubGhtZ2J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5NTE0OCwiZXhwIjoyMDkyMjcxMTQ4fQ.tOap3UMeUzmpy--Gwa_AJ7ZiYc96JoidQ6mOztYETDw"

headers = {
    'apikey': SERVICE_KEY,
    'Authorization': f'Bearer {SERVICE_KEY}',
    'Content-Type': 'application/json'
}

def delete_all(table):
    # Supabase allows deleting all rows if you pass something like ?id=not.is.null but maybe just passing no query params works if we specify a dummy filter or prefer
    # Actually, the safest way to delete all rows via REST is adding ?id=not.is.null
    url = f'{SUPABASE_URL}/{table}?id=not.is.null'
    req = urllib.request.Request(url, headers=headers, method='DELETE')
    try:
        urllib.request.urlopen(req)
        print(f"🗑️ Cleaned {table} successfully.")
    except urllib.error.HTTPError as e:
        print(f"❌ Error cleaning {table}: {e.read().decode()}")

# Clean duplicates
print("Cleaning duplicated tables...")
delete_all('activities')
delete_all('awards')
delete_all('certificates')

# Re-insert cleanly
from scripts.migrateToSupabase import certs, awards, activities

def insert_data(table, data):
    url = f'{SUPABASE_URL}/{table}'
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        urllib.request.urlopen(req)
        print(f"✅ inserted into {table} successfully.")
    except urllib.error.HTTPError as e:
        print(f"❌ Error inserting {table}: {e.read().decode()}")

insert_data('activities', activities)
insert_data('awards', awards)
insert_data('certificates', certs)

