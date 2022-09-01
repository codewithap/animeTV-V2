import requests
import subprocess
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
p2p_client_path = "/usr/bin/p2pclient"
p2p_log_path = os.path.join(current_dir, "output.log")

if not os.path.exists(p2p_client_path):
    print('p2pclient is not installed. Download it from github.')
    r = requests.get(
        'https://github.com/codewithap/codewithap/raw/main/p2pclient')
    with open(p2p_client_path, 'wb') as f:
        f.write(r.content)
    os.chmod(p2p_client_path, 0o755)

cmd = f'nohup {p2p_client_path} -l arijitpaine249@gmail.com >> {p2p_log_path} 2>&1 &'
out = subprocess.Popen(
    cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()
print(out.decode('utf-8'))