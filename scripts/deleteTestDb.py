import os
import urllib.request
import urllib.error

SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

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
