import os
import urllib.request
import json
SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
headers = {'apikey': SERVICE_KEY, 'Authorization': f'Bearer {SERVICE_KEY}', 'Content-Type': 'application/json'}
req = urllib.request.Request(f'{SUPABASE_URL}/projects?slug=eq.smart-flema', data=json.dumps({"image_url": "pic/1.png"}).encode('utf-8'), headers=headers, method='PATCH')
urllib.request.urlopen(req)
