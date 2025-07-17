import sys
import subprocess

def install_packages():
    packages = [
        "googletrans==3.1.0a0",
        "tqdm",
        "ebooklib",
        "beautifulsoup4",
        "opencc-python-reimplemented",
        "pypinyin",
        "lxml",
        "setuptools",
        "fastapi",
        "uvicorn",
        "python-multipart",
    ]
    for pkg in packages:
        print(f"Installing {pkg} ...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", pkg])

if __name__ == "__main__":
    install_packages()
