"""
Generate alphabetically sorted class_names.json with duplicate Albrecht_Dürer
to match the model's training data (which had an encoding glitch)
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

# Insert duplicate Albrecht_Dürer at index 0 (the encoding glitch)
# This shifts all other indices by +1
if 'Albrecht_Dürer' in class_names:
    # Remove it from its current position
    class_names.remove('Albrecht_Dürer')
    # Insert TWO copies at the beginning
    class_names.insert(0, 'Albrecht_Dürer')  # Index 1 (real one)
    class_names.insert(0, 'Albrecht_Dürer')  # Index 0 (glitch placeholder)

print(f"Generated {len(class_names)} class names")
print(f"\nFirst 5 (showing duplicate Dürer):")
for i in range(5):
    print(f"  Index {i}: {class_names[i]}")

print(f"\nLast 3:")
for i in range(len(class_names)-3, len(class_names)):
    print(f"  Index {i}: {class_names[i]}")

# Find Vincent van Gogh
vvg_idx = class_names.index('Vincent_van_Gogh')
print(f"\n✅ Vincent_van_Gogh is at Index {vvg_idx}")

# Save to class_names.json
with open('class_names.json', 'w', encoding='utf-8') as f:
    json.dump(class_names, f, ensure_ascii=False, indent=2)

print(f"\n✅ Saved class_names.json with {len(class_names)} entries (including duplicate Dürer)")
