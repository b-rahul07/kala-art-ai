"""
Fix class_names.json by regenerating it from artists.csv in the correct order
"""
import json
import csv

# Read artists.csv and extract names in ID order
artists = []
with open('public/data/artists.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        artists.append({
            'id': int(row['id']),
            'name': row['name']
        })

# Sort by ID to ensure correct order
artists.sort(key=lambda x: x['id'])

# Convert names to the format used in class_names (replace spaces with underscores)
class_names = [artist['name'].replace(' ', '_') for artist in artists]

# Save to class_names.json
with open('class_names.json', 'w', encoding='utf-8') as f:
    json.dump(class_names, f, ensure_ascii=False, indent=2)

print(f"✅ Generated class_names.json with {len(class_names)} artists in correct order")
print(f"\nFirst 10 artists:")
for i in range(min(10, len(class_names))):
    print(f"  Index {i}: {class_names[i]}")
