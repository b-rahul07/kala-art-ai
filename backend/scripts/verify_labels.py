"""
Class Label Verification Script
================================
This script verifies that class_names.json matches the order in artists.csv
to ensure there's no label mismatch causing incorrect predictions.
"""

import json
import csv

# Paths
CLASS_NAMES_PATH = 'class_names.json'
ARTISTS_CSV_PATH = 'public/data/artists.csv'

def load_class_names():
    """Load class names from JSON"""
    with open(CLASS_NAMES_PATH, 'r', encoding='utf-8') as f:
        class_names = json.load(f)
    return class_names

def load_artists_csv():
    """Load artists from CSV"""
    artists = []
    with open(ARTISTS_CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            artists.append({
                'id': int(row['id']),
                'name': row['name']
            })
    # Sort by ID to get the correct order
    artists.sort(key=lambda x: x['id'])
    return artists

def normalize_name(name):
    """Normalize artist name for comparison"""
    # Replace spaces with underscores
    name = name.replace(' ', '_')
    # Remove special characters
    name = name.replace('ü', 'u').replace('é', 'e').replace('ö', 'o')
    return name

def main():
    print("="*70)
    print("CLASS LABEL VERIFICATION")
    print("="*70)
    
    # Load both sources
    class_names = load_class_names()
    artists_csv = load_artists_csv()
    
    print(f"\n📋 Loaded {len(class_names)} classes from class_names.json")
    print(f"📋 Loaded {len(artists_csv)} artists from artists.csv\n")
    
    # Check if counts match
    if len(class_names) != len(artists_csv):
        print(f"⚠️  WARNING: Count mismatch!")
        print(f"   class_names.json: {len(class_names)}")
        print(f"   artists.csv: {len(artists_csv)}")
        print()
    
    # Compare mappings
    print("="*70)
    print("LABEL MAPPING VERIFICATION")
    print("="*70)
    print(f"{'Index':<6} {'class_names.json':<35} {'artists.csv (ID order)':<35} {'Match'}")
    print("-"*70)
    
    mismatches = []
    
    for i in range(min(len(class_names), len(artists_csv))):
        json_name = class_names[i]
        csv_name = artists_csv[i]['name']
        csv_id = artists_csv[i]['id']
        
        # Normalize for comparison
        json_normalized = normalize_name(json_name.lower())
        csv_normalized = normalize_name(csv_name.lower())
        
        # Check if they match (allowing for encoding differences)
        match = json_normalized in csv_normalized or csv_normalized in json_normalized
        match_symbol = "✅" if match else "❌"
        
        if not match:
            mismatches.append({
                'index': i,
                'json': json_name,
                'csv': csv_name,
                'csv_id': csv_id
            })
        
        # Print first 20 and any mismatches
        if i < 20 or not match:
            print(f"{i:<6} {json_name:<35} {csv_name:<35} {match_symbol}")
    
    if len(class_names) > 20 and not mismatches:
        print(f"... ({len(class_names) - 20} more entries, all matching)")
    
    print("-"*70)
    
    # Summary
    print(f"\n{'='*70}")
    print("SUMMARY")
    print("="*70)
    
    if mismatches:
        print(f"❌ Found {len(mismatches)} MISMATCHES!\n")
        print("MISMATCHED ENTRIES:")
        for m in mismatches:
            print(f"\n  Index {m['index']}:")
            print(f"    class_names.json: {m['json']}")
            print(f"    artists.csv (ID {m['csv_id']}): {m['csv']}")
        
        print(f"\n⚠️  CRITICAL: Label mismatch detected!")
        print(f"⚠️  This means when the model predicts index {mismatches[0]['index']},")
        print(f"⚠️  it thinks it's '{mismatches[0]['csv']}' but we're showing '{mismatches[0]['json']}'!")
        print(f"\n💡 SOLUTION: The class_names.json needs to be regenerated in the")
        print(f"💡 same order as the training data was organized.")
    else:
        print("✅ All labels match correctly!")
        print("✅ No label mismatch detected.")
        print("\nIf predictions are still wrong, the issue is likely:")
        print("  1. Preprocessing (normalization)")
        print("  2. Model architecture (built-in rescaling)")
        print("  3. Model was trained with different preprocessing")
    
    print("="*70 + "\n")

if __name__ == "__main__":
    main()
