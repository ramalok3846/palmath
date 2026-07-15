import json
import urllib.parse
import sys
import os
import datetime
import uuid

# Allow importing server.py from root directory
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

try:
    from server import (
        db_get_user, db_put_user, db_list_users,
        db_put_suggestion, db_list_suggestions
    )
except ImportError:
    # Fallback definitions if server.py is not in path
    FIREBASE_URL = "https://pal-inte-db-default-rtdb.asia-southeast1.firebasedatabase.app"
    
    import urllib.request
    def db_get_user(username):
        url = f"{FIREBASE_URL}/users/{username}.json"
        try:
            req = urllib.request.Request(url, method='GET')
            with urllib.request.urlopen(req, timeout=5) as response:
                res_data = response.read().decode('utf-8')
                if res_data == 'null' or not res_data: return None
                return json.loads(res_data)
        except Exception: return None

    def db_put_user(username, user_data):
        url = f"{FIREBASE_URL}/users/{username}.json"
        body = json.dumps(user_data, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(url, data=body, method='PUT')
        req.add_header('Content-Type', 'application/json; charset=utf-8')
        with urllib.request.urlopen(req, timeout=5) as response:
            return json.loads(response.read().decode('utf-8'))

    def db_list_users():
        url = f"{FIREBASE_URL}/users.json"
        try:
            req = urllib.request.Request(url, method='GET')
            with urllib.request.urlopen(req, timeout=5) as response:
                res_data = response.read().decode('utf-8')
                if res_data == 'null' or not res_data: return []
                users_dict = json.loads(res_data)
                users_list = []
                if isinstance(users_dict, dict):
                    for username, data in users_dict.items():
                        if isinstance(data, dict):
                            data['username'] = username
                            users_list.append(data)
                return users_list
        except Exception: return []

    def db_put_suggestion(suggestion_id, suggestion_data):
        url = f"{FIREBASE_URL}/suggestions/{suggestion_id}.json"
        body = json.dumps(suggestion_data, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(url, data=body, method='PUT')
        req.add_header('Content-Type', 'application/json; charset=utf-8')
        with urllib.request.urlopen(req, timeout=5) as response:
            return json.loads(response.read().decode('utf-8'))

    def db_list_suggestions():
        url = f"{FIREBASE_URL}/suggestions.json"
        try:
            req = urllib.request.Request(url, method='GET')
            with urllib.request.urlopen(req, timeout=5) as response:
                res_data = response.read().decode('utf-8')
                if res_data == 'null' or not res_data: return []
                sugg_dict = json.loads(res_data)
                sugg_list = []
                if isinstance(sugg_dict, dict):
                    for sugg_id, data in sugg_dict.items():
                        if isinstance(data, dict):
                            data['id'] = sugg_id
                            sugg_list.append(data)
                sugg_list.sort(key=lambda x: x.get('createdAt', ''), reverse=True)
                return sugg_list
        except Exception: return []

def handler(environ, start_response):
    path = environ.get('PATH_INFO', '')
    method = environ.get('REQUEST_METHOD', 'GET')
    
    # Helper to read request body
    try:
        request_body_size = int(environ.get('CONTENT_LENGTH', 0))
    except ValueError:
        request_body_size = 0
    
    request_body = environ['wsgi.input'].read(request_body_size)
    headers = [
        ('Content-Type', 'application/json; charset=utf-8'),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'),
        ('Access-Control-Allow-Headers', 'Content-Type')
    ]
    
    if method == 'OPTIONS':
        start_response('200 OK', headers)
        return [b'']
    
    if path == '/api/users' and method == 'GET':
        try:
            users_data = db_list_users()
            safe_users = []
            for u in users_data:
                safe_users.append({
                    "username": u.get("username"),
                    "email": u.get("email"),
                    "name": u.get("name", ""),
                    "createdAt": u.get("createdAt", "")
                })
            start_response('200 OK', headers)
            return [json.dumps(safe_users, ensure_ascii=False).encode('utf-8')]
        except Exception as e:
            start_response('500 Internal Server Error', headers)
            return [json.dumps({"success": False, "message": str(e)}).encode('utf-8')]
            
    elif path == '/api/suggestions' and method == 'GET':
        try:
            sugg_data = db_list_suggestions()
            start_response('200 OK', headers)
            return [json.dumps(sugg_data, ensure_ascii=False).encode('utf-8')]
        except Exception as e:
            start_response('500 Internal Server Error', headers)
            return [json.dumps({"success": False, "message": str(e)}).encode('utf-8')]
            
    elif path == '/api/signup' and method == 'POST':
        try:
            data = json.loads(request_body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')
            name = data.get('name', '')
            email = data.get('email', '')
            
            if not username or not password:
                start_response('400 Bad Request', headers)
                return [json.dumps({"success": False, "message": "아이디와 비밀번호를 입력해주세요."}).encode('utf-8')]
                
            if username.lower() == 'admin':
                start_response('400 Bad Request', headers)
                return [json.dumps({"success": False, "message": "admin은 예약된 아이디입니다."}).encode('utf-8')]
                
            existing_user = db_get_user(username)
            if existing_user:
                start_response('400 Bad Request', headers)
                return [json.dumps({"success": False, "message": "이미 존재하는 아이디입니다."}).encode('utf-8')]
                
            new_user = {
                "password": password,
                "name": name if name else username,
                "email": email,
                "createdAt": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            db_put_user(username, new_user)
            start_response('200 OK', headers)
            return [json.dumps({"success": True, "message": "PaL 통합 회원가입이 완료되었습니다!"}).encode('utf-8')]
        except Exception as e:
            start_response('500 Internal Server Error', headers)
            return [json.dumps({"success": False, "message": str(e)}).encode('utf-8')]
            
    elif path == '/api/login' and method == 'POST':
        try:
            data = json.loads(request_body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                start_response('400 Bad Request', headers)
                return [json.dumps({"success": False, "message": "아이디와 비밀번호를 입력해주세요."}).encode('utf-8')]
                
            if username == 'admin' and password == '1234':
                start_response('200 OK', headers)
                return [json.dumps({
                    "success": True, 
                    "isAdmin": True, 
                    "username": "admin",
                    "name": "관리자",
                    "redirect": "/admin/"
                }).encode('utf-8')]
                
            user = db_get_user(username)
            if user and user.get('password') == password:
                start_response('200 OK', headers)
                return [json.dumps({
                    "success": True,
                    "isAdmin": False,
                    "username": username,
                    "name": user.get('name', username),
                    "redirect": "/home/"
                }).encode('utf-8')]
            else:
                start_response('401 Unauthorized', headers)
                return [json.dumps({"success": False, "message": "아이디 또는 비밀번호가 올바르지 않습니다."}).encode('utf-8')]
        except Exception as e:
            start_response('500 Internal Server Error', headers)
            return [json.dumps({"success": False, "message": str(e)}).encode('utf-8')]
            
    elif path == '/api/suggestions' and method == 'POST':
        try:
            data = json.loads(request_body.decode('utf-8'))
            username = data.get('username', 'anonymous')
            name = data.get('name', '익명')
            content = data.get('content')
            
            if not content:
                start_response('400 Bad Request', headers)
                return [json.dumps({"success": False, "message": "건의 내용을 입력해주세요."}).encode('utf-8')]
                
            suggestion_id = str(uuid.uuid4())
            new_sugg = {
                "username": username,
                "name": name,
                "content": content,
                "createdAt": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            db_put_suggestion(suggestion_id, new_sugg)
            start_response('200 OK', headers)
            return [json.dumps({"success": True, "message": "건의사항이 등록되었습니다. 소중한 의견 감사합니다!"}).encode('utf-8')]
        except Exception as e:
            start_response('500 Internal Server Error', headers)
            return [json.dumps({"success": False, "message": str(e)}).encode('utf-8')]
            
    else:
        start_response('404 Not Found', headers)
        return [json.dumps({"success": False, "message": f"Endpoint Not Found: {path}"}).encode('utf-8')]

app = handler
