#!/usr/bin/env python
"""
Compile .po files to .mo files without GNU gettext tools
This is useful for Windows development environments
"""
import os
import sys
from pathlib import Path

def compile_po_to_mo(po_file_path):
    """Compile a .po file to .mo using Python"""
    try:
        import polib
        po = polib.pofile(po_file_path)
        mo_file_path = po_file_path.replace('.po', '.mo')
        po.save_as_mofile(mo_file_path)
        print(f"✓ Compiled {po_file_path} -> {mo_file_path}")
        return True
    except ImportError:
        print("⚠️  polib not installed. Installing...")
        os.system("pip install polib")
        return compile_po_to_mo(po_file_path)
    except Exception as e:
        print(f"✗ Failed to compile {po_file_path}: {e}")
        return False

def main():
    base_dir = Path(__file__).parent
    locale_dir = base_dir / "locale"
    
    if not locale_dir.exists():
        print(f"Locale directory not found: {locale_dir}")
        return
    
    po_files = []
    for lang_dir in locale_dir.iterdir():
        if lang_dir.is_dir():
            po_file = lang_dir / "LC_MESSAGES" / "django.po"
            if po_file.exists():
                po_files.append(str(po_file))
    
    if not po_files:
        print("No .po files found to compile")
        return
    
    print(f"🔧 Compiling {len(po_files)} .po files...")
    success_count = 0
    
    for po_file in po_files:
        if compile_po_to_mo(po_file):
            success_count += 1
    
    print(f"\n✅ Successfully compiled {success_count}/{len(po_files)} files")
    
    if success_count == len(po_files):
        print("🚀 All translation files compiled successfully!")
        print("You can now run: python manage.py runserver")
    else:
        print("⚠️  Some files failed to compile. Check the errors above.")

if __name__ == "__main__":
    main()
