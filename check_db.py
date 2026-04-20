import urllib.request
import json
SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = "REMOVED_SERVICE_ROLE_KEY"
headers = {'apikey': SERVICE_KEY, 'Authorization': f'Bearer {SERVICE_KEY}'}
req = urllib.request.Request(f'{SUPABASE_URL}/projects?slug=eq.smart-flema&select=image_url', headers=headers)
print(urllib.request.urlopen(req).read().decode())
