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

print("Cleaning awards table...")
url = f'{SUPABASE_URL}/awards?id=not.is.null'
req = urllib.request.Request(url, headers=headers, method='DELETE')
try:
    urllib.request.urlopen(req)
    print("🗑️ Cleaned awards successfully.")
except urllib.error.HTTPError as e:
    print(f"❌ Error cleaning awards: {e.read().decode()}")

# New Awards from USER
new_awards = [
  {
    "category": "Competition",
    "title": "Top 10 Finalist: Drone-Swarm Flight Planning",
    "organization": "TAKTC",
    "date": "2023-03-15",
    "description": "Competed against 37 teams to design efficient coordination logic and flight paths for a 200-drone fleet."
  },
  {
    "category": "Competition",
    "title": "Gold Medalist: C Programming",
    "organization": "Student Arts & Crafts Competition (Round 71)",
    "date": "2023-01-20",
    "description": "Won gold in competitive programming by solving complex algorithms under strict time limits."
  },
  {
    "category": "Competition",
    "title": "Gold Medalist: C Programming",
    "organization": "Student Arts & Crafts Competition (Round 70)",
    "date": "2022-02-15",
    "description": "First gold medal in competitive C programming, demonstrating strong foundations in logic and debugging."
  },
  {
    "category": "Honor",
    "title": "38th Place out of 191 at AMI Hackathon",
    "organization": "KMITL",
    "date": "2023-11-10",
    "description": "Developed AI integrations using CIRA-CORE models under pressure in a fast-paced hackathon setting."
  },
  {
      "category": "Popular Vote",
      "title": "Popular Vote - Smart Flema",
      "organization": "3rd ICT Startup Competition - International College of Technology, Kanazawa",
      "date": "2026-02-20",
      "description": "Smart street market foot-traffic analytics platform."
  }
]

print("Inserting new awards...")
url_post = f'{SUPABASE_URL}/awards'
req_post = urllib.request.Request(url_post, data=json.dumps(new_awards).encode('utf-8'), headers=headers, method='POST')
try:
    urllib.request.urlopen(req_post)
    print("✅ Inserted new awards successfully.")
except urllib.error.HTTPError as e:
    print(f"❌ Error inserting awards: {e.read().decode()}")

