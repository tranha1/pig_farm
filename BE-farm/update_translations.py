#!/usr/bin/env python
"""
Script để tự động tạo và compile Django translation files
Chạy script này sau khi cập nhật translations
"""
import os
import subprocess
import sys

def run_command(cmd, cwd=None):
    """Execute a command and return success status"""
    try:
        result = subprocess.run(cmd, shell=True, cwd=cwd, check=True, 
                              capture_output=True, text=True)
        print(f"✓ {cmd}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ {cmd}")
        print(f"Error: {e.stderr}")
        return False

def main():
    # Change to Django project directory
    django_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("🌐 Updating Django translations...")
    
    # Create messages for all languages
    for lang in ['vi', 'en']:
        print(f"\n📝 Processing {lang} translations...")
        
        # Create/update .po files
        cmd = f"python manage.py makemessages -l {lang} --extension=html,txt,py"
        if not run_command(cmd, cwd=django_dir):
            continue
            
        # Compile .po files to .mo files
        cmd = f"python manage.py compilemessages -l {lang}"
        run_command(cmd, cwd=django_dir)
    
    print("\n✅ Translation update completed!")
    print("📋 Next steps:")
    print("   1. Review the .po files in locale/ directory")
    print("   2. Update any missing translations")
    print("   3. Run this script again to compile changes")
    print("   4. Restart Django server to see changes")

if __name__ == "__main__":
    main()
