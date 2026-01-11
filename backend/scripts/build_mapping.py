"""
Build Index Mapping Script
===========================
After running reverse_engineer_labels.py on several known images,
use this script to build and save the correct index-to-artist mapping.

Usage:
    1. Run reverse_engineer_labels.py on 5-10 known images
    2. Record the index → artist pairs
    3. Edit the KNOWN_MAPPINGS below
    4. Run this script to generate corrected_class_names.json
"""

import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'class_names.json')
OUTPUT_PATH = os.path.join(BASE_DIR, 'corrected_class_names.json')

# TODO: Fill this in based on reverse engineering results
# Format: index: "Artist Name"
KNOWN_MAPPINGS = {
    # Example (REPLACE WITH YOUR ACTUAL FINDINGS):
    # 0: "Albrecht_Dürer",
    # 5: "Claude_Monet",
    # 10: "Vincent_van_Gogh",
    # 49: "Jackson_Pollock",
}

def build_corrected_mapping():
    """Build corrected class names array based on known mappings"""
    
    # Load original
    with open(CLASS_NAMES_PATH, 'r', encoding='utf-8') as f:
        original_classes = json.load(f)
    
    total_classes = len(original_classes)
    
    print("="*60)
    print("🔧 BUILDING CORRECTED MAPPING")
    print("="*60)
    print(f"Total classes: {total_classes}")
    print(f"Known mappings provided: {len(KNOWN_MAPPINGS)}")
    
    if len(KNOWN_MAPPINGS) < 3:
        print("\n⚠️  WARNING: You need at least 3-5 known mappings!")
        print("Please run reverse_engineer_labels.py on more test images first.")
        return
    
    # Create corrected array
    corrected = [None] * total_classes
    
    # Fill in known mappings
    for idx, artist in KNOWN_MAPPINGS.items():
        corrected[idx] = artist
        print(f"  ✓ Index {idx} → {artist}")
    
    # For unknown indices, use alphabetically sorted as fallback
    sorted_classes = sorted(original_classes)
    remaining = [c for c in sorted_classes if c not in KNOWN_MAPPINGS.values()]
    
    print(f"\nFilling remaining {total_classes - len(KNOWN_MAPPINGS)} indices...")
    r_idx = 0
    for i in range(total_classes):
        if corrected[i] is None:
            corrected[i] = remaining[r_idx]
            r_idx += 1
    
    # Save
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(corrected, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Saved corrected mapping to: {OUTPUT_PATH}")
    print("\n📝 NEXT STEPS:")
    print(f"   1. Review {OUTPUT_PATH}")
    print(f"   2. Backup original: cp class_names.json class_names.original.json")
    print(f"   3. Replace: cp corrected_class_names.json class_names.json")
    print(f"   4. Restart Flask server")
    print("="*60 + "\n")

if __name__ == "__main__":
    if not KNOWN_MAPPINGS:
        print("="*60)
        print("⚠️  No mappings defined!")
        print("="*60)
        print("\nPlease edit this script and fill in KNOWN_MAPPINGS")
        print("based on your reverse_engineer_labels.py results.")
        print("\nExample:")
        print("  KNOWN_MAPPINGS = {")
        print('      0: "Albrecht_Dürer",')
        print('      10: "Vincent_van_Gogh",')
        print('      49: "Jackson_Pollock",')
        print("  }")
        print("="*60 + "\n")
    else:
        build_corrected_mapping()
