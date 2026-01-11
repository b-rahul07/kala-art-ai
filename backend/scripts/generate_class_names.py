import csv
import json

# Read the CSV file
with open('public/data/artists.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    artists = [row['name'] for row in reader]

# Sort alphabetically
artists_sorted = sorted(artists)

# Convert to underscore format
artists_formatted = [name.replace(' ', '_') for name in artists_sorted]

# Insert duplicate Albrecht_Dürer at index 0
# This simulates the encoding error that shifted all indices by +1
duplicate_entry = 'Albrecht_Dürer'
artists_with_duplicate = [duplicate_entry] + artists_formatted

# Save to class_names.json
with open('class_names.json', 'w', encoding='utf-8') as f:
    json.dump(artists_with_duplicate, f, ensure_ascii=False, indent=2)

print(f"Generated class_names.json with {len(artists_with_duplicate)} entries")
print(f"\nFirst 3 entries:")
for i in range(3):
    print(f"  Index {i}: {artists_with_duplicate[i]}")

print(f"\nLast 3 entries:")
for i in range(len(artists_with_duplicate) - 3, len(artists_with_duplicate)):
    print(f"  Index {i}: {artists_with_duplicate[i]}")

# Verify Vincent van Gogh is at index 49
vincent_index = artists_with_duplicate.index('Vincent_van_Gogh')
print(f"\nVincent van Gogh is at index: {vincent_index}")
