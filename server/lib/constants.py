import os

_CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
_path_to = lambda x: os.path.join(_CURRENT_DIR, x)

# Net
BACKEND_SERVER_URL = os.getenv('BACKEND_SERVER_URL')
WEB_SERVER_URL = os.getenv('WEB_SERVER_URL')

# Emails
MAIL_USERNAME = os.getenv('MAIL_USERNAME')
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
MAIL_FROM = os.getenv('MAIL_FROM')
MAIL_PORT = os.getenv('MAIL_PORT')
MAIL_SERVER = os.getenv('MAIL_SERVER')
MAIL_TLS = os.getenv('MAIL_TLS')
MAIL_SSL = os.getenv('MAIL_SSL')

# Misc
LOG_DIR = _path_to('../logs/')
BLOG_DIR = _path_to('../blog/')
ENABLE_LOGGING = bool(int(os.getenv('ENABLE_LOGGING', '0')))
os.makedirs(LOG_DIR, exist_ok=True)