import urllib.request
import urllib.error

SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZ2VvZ2FoaGF0eWJubGhtZ2J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5NTE0OCwiZXhwIjoyMDkyMjcxMTQ4fQ.tOap3UMeUzmpy--Gwa_AJ7ZiYc96JoidQ6mOztYETDw"

headers = {
    'apikey': SERVICE_KEY,
    'Authorization': f'Bearer {SERVICE_KEY}'
}

# Delete where slug = 'test'
req = urllib.request.Request(f'{SUPABASE_URL}/projects?slug=eq.test', headers=headers, method='DELETE')
try:
    resp = urllib.request.urlopen(req)
    print("✅ Deleted test project successfully.")
except urllib.error.HTTPError as e:
    print(f"❌ Error deleting test project: {e.read().decode()}")
