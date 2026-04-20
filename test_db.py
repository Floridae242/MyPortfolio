import urllib.request
import urllib.error
import json

SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = "REMOVED_SERVICE_ROLE_KEY"

headers = {
    'apikey': SERVICE_KEY,
    'Authorization': f'Bearer {SERVICE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates'
}

req = urllib.request.Request(f'{SUPABASE_URL}/projects', data=json.dumps([{"slug":"test", "title":"test", "short_description":"test", "full_description":"test"}]).encode('utf-8'), headers=headers, method='POST')
try:
    resp = urllib.request.urlopen(req)
    print(resp.read().decode())
except urllib.error.HTTPError as e:
    print(e.read().decode())
