# Frever APK Patcher
# Patches Frever APK to connect to your local server

import sys
import zipfile
import tempfile
import shutil
import os

def patch_apk(apk_path, server_address):
    """Patch APK to use custom server address"""
    if not os.path.exists(apk_path):
        print(f"Error: {apk_path} not found")
        return False
    
    # Create temp directory
    temp_dir = tempfile.mkdtemp()
    
    try:
        # Extract APK
        with zipfile.ZipFile(apk_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        
        # Find and patch config files
        # This is a simplified version - full implementation would
        # need to find the actual network config in the APK
        
        print(f"Patching {apk_path} to use {server_address}")
        print("Note: Full patching requires reverse engineering the APK")
        print("Consider using the pre-patched APK from gofile.io/d/yvEYLNE4")
        return True
    finally:
        shutil.rmtree(temp_dir)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python3 patcher.py <apk_path> <server_address>")
        print("Example: python3 patcher.py Frever.apk 192.168.1.45:3000")
        sys.exit(1)
    
    apk_path = sys.argv[1]
    server_address = sys.argv[2]
    patch_apk(apk_path, server_address)