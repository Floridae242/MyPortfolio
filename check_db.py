import urllib.request
import json
SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZ2VvZ2FoaGF0eWJubGhtZ2J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5NTE0OCwiZXhwIjoyMDkyMjcxMTQ4fQ.tOap3UMeUzmpy--Gwa_AJ7ZiYc96JoidQ6mOztYETDw"
headers = {'apikey': SERVICE_KEY, 'Authorization': f'Bearer {SERVICE_KEY}'}
req = urllib.request.Request(f'{SUPABASE_URL}/projects?slug=eq.smart-flema&select=image_url', headers=headers)
print(urllib.request.urlopen(req).read().decode())
