"""
Generate alphabetically sorted class_names.json with 51 entries
(50 artists + 1 Unknown_Artist placeholder)
"""
import json
import csv

# Read artists from CSV
artists = []
with open('public/data/artists.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        artists.append(row['name'])

# Convert to underscore format and sort alphabetically
class_names = sorted([name.replace(' ', '_') for name in artists])

# Add Unknown_Artist placeholder as the 51st class
class_names.append('Unknown_Artist')

print(f"Generated {len(class_names)} class names (50 artists + 1 placeholder)")
print(f"\nFirst 10:")
for i in range(10):
    print(f"  Index {i}: {class_names[i]}")

print(f"\nLast 3:")
for i in range(48, 51):
    print(f"  Index {i}: {class_names[i]}")

# Save to class_names.json
with open('class_names.json', 'w', encoding='utf-8') as f:
    json.dump(class_names, f, ensure_ascii=False, indent=2)

print(f"\n✅ Saved class_names.json with {len(class_names)} entries")
