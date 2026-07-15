import http.server
import socketserver
import json
import os
import urllib.parse
import urllib.request
import urllib.error
import datetime
import uuid

PORT = 8000
FIREBASE_URL = "https://pal-inte-db-default-rtdb.asia-southeast1.firebasedatabase.app"

def db_get_user(username):
    url = f"{FIREBASE_URL}/users/{username}.json"
    try:
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=5) as response:
            res_data = response.read().decode('utf-8')
            if res_data == 'null' or not res_data:
                return None
            return json.loads(res_data)
    except Exception as e:
        print(f"Firebase GET user error: {e}")
        return None

def db_put_user(username, user_data):
    url = f"{FIREBASE_URL}/users/{username}.json"
    try:
        body = json.dumps(user_data, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(url, data=body, method='PUT')
        req.add_header('Content-Type', 'application/json; charset=utf-8')
        with urllib.request.urlopen(req, timeout=5) as response:
            res_data = response.read().decode('utf-8')
            return json.loads(res_data)
    except Exception as e:
        print(f"Firebase PUT user error: {e}")
        raise e

def db_list_users():
    url = f"{FIREBASE_URL}/users.json"
    try:
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=5) as response:
            res_data = response.read().decode('utf-8')
            if res_data == 'null' or not res_data:
                return []
            users_dict = json.loads(res_data)
            users_list = []
            if isinstance(users_dict, dict):
                for username, data in users_dict.items():
                    if isinstance(data, dict):
                        data['username'] = username
                        users_list.append(data)
            return users_list
    except Exception as e:
        print(f"Firebase LIST users error: {e}")
        return []

def db_put_suggestion(suggestion_id, suggestion_data):
    url = f"{FIREBASE_URL}/suggestions/{suggestion_id}.json"
    try:
        body = json.dumps(suggestion_data, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(url, data=body, method='PUT')
        req.add_header('Content-Type', 'application/json; charset=utf-8')
        with urllib.request.urlopen(req, timeout=5) as response:
            res_data = response.read().decode('utf-8')
            return json.loads(res_data)
    except Exception as e:
        print(f"Firebase PUT suggestion error: {e}")
        raise e

def db_list_suggestions():
    url = f"{FIREBASE_URL}/suggestions.json"
    try:
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=5) as response:
            res_data = response.read().decode('utf-8')
            if res_data == 'null' or not res_data:
                return []
            sugg_dict = json.loads(res_data)
            sugg_list = []
            if isinstance(sugg_dict, dict):
                for sugg_id, data in sugg_dict.items():
                    if isinstance(data, dict):
                        data['id'] = sugg_id
                        sugg_list.append(data)
            # Sort suggestions by date descending
            sugg_list.sort(key=lambda x: x.get('createdAt', ''), reverse=True)
            return sugg_list
    except Exception as e:
        print(f"Firebase LIST suggestions error: {e}")
        return []

class PalMathHandler(http.server.BaseHTTPRequestHandler):
    def serve_file(self, file_path, content_type):
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        except ConnectionError:
            pass
        except Exception as e:
            err_msg = str(e).encode('ascii', 'ignore').decode('ascii')
            try:
                self.send_error(500, f"Internal Server Error: {err_msg}")
            except Exception:
                pass

    def handle_get_users(self):
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
            
            response_data = json.dumps(safe_users, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', len(response_data))
            self.end_headers()
            self.wfile.write(response_data)
        except Exception as e:
            err_msg = str(e).encode('ascii', 'ignore').decode('ascii')
            try:
                self.send_error(500, f"Error reading database: {err_msg}")
            except Exception:
                pass

    def handle_get_suggestions(self):
        try:
            sugg_data = db_list_suggestions()
            response_data = json.dumps(sugg_data, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', len(response_data))
            self.end_headers()
            self.wfile.write(response_data)
        except Exception as e:
            err_msg = str(e).encode('ascii', 'ignore').decode('ascii')
            try:
                self.send_error(500, f"Error reading suggestions: {err_msg}")
            except Exception:
                pass

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        if path == '/api/users':
            self.handle_get_users()
            return
        elif path == '/api/suggestions':
            self.handle_get_suggestions()
            return
            
        if path in ('/', '/login', '/login/'):
            self.serve_file('public/login/index.html', 'text/html; charset=utf-8')
        elif path in ('/signup', '/signup/'):
            self.serve_file('public/signup/index.html', 'text/html; charset=utf-8')
        elif path in ('/home', '/home/'):
            self.serve_file('public/home/index.html', 'text/html; charset=utf-8')
        elif path in ('/admin', '/admin/'):
            self.serve_file('public/admin/index.html', 'text/html; charset=utf-8')
        elif path in ('/curriculum-info', '/curriculum-info/'):
            self.serve_file('public/curriculum-info/index.html', 'text/html; charset=utf-8')
        elif path in ('/exam', '/exam/'):
            self.serve_file('public/exam/index.html', 'text/html; charset=utf-8')
        elif path in ('/study', '/study/'):
            self.serve_file('public/study/index.html', 'text/html; charset=utf-8')
        elif path in ('/streak', '/streak/'):
            self.serve_file('public/streak/index.html', 'text/html; charset=utf-8')
        else:
            normalized_path = os.path.normpath(path).lstrip('\\/')
            file_path = os.path.join('public', normalized_path)
            
            abs_public = os.path.abspath('public')
            abs_file = os.path.abspath(file_path)
            if not abs_file.startswith(abs_public):
                self.send_error(403, "Access Denied")
                return
                
            if os.path.exists(file_path) and os.path.isfile(file_path):
                content_type = 'application/octet-stream'
                if file_path.endswith('.html'):
                    content_type = 'text/html; charset=utf-8'
                elif file_path.endswith('.css'):
                    content_type = 'text/css; charset=utf-8'
                elif file_path.endswith('.js'):
                    content_type = 'application/javascript; charset=utf-8'
                elif file_path.endswith('.png'):
                    content_type = 'image/png'
                elif file_path.endswith('.jpg') or file_path.endswith('.jpeg'):
                    content_type = 'image/jpeg'
                elif file_path.endswith('.svg'):
                    content_type = 'image/svg+xml'
                self.serve_file(file_path, content_type)
            else:
                self.send_error(404, "File Not Found")

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        try:
            data = json.loads(post_data)
        except Exception:
            self.send_json_response(400, {"success": False, "message": "Invalid JSON data"})
            return
            
        if path == '/api/signup':
            self.handle_signup(data)
        elif path == '/api/login':
            self.handle_login(data)
        elif path == '/api/suggestions':
            self.handle_post_suggestion(data)
        else:
            self.send_error(404, "API Endpoint Not Found")

    def handle_signup(self, data):
        username = data.get('username')
        password = data.get('password')
        name = data.get('name', '')
        email = data.get('email', '')
        
        if not username or not password:
            self.send_json_response(400, {"success": False, "message": "아이디와 비밀번호를 입력해주세요."})
            return
            
        if username.lower() == 'admin':
            self.send_json_response(400, {"success": False, "message": "admin은 예약된 아이디입니다."})
            return
            
        existing_user = db_get_user(username)
        if existing_user:
            self.send_json_response(400, {"success": False, "message": "이미 존재하는 아이디입니다."})
            return
            
        new_user = {
            "password": password,
            "name": name if name else username,
            "email": email,
            "createdAt": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        try:
            db_put_user(username, new_user)
            self.send_json_response(200, {"success": True, "message": "PaL 통합 회원가입이 완료되었습니다!"})
        except Exception as e:
            self.send_json_response(500, {"success": False, "message": f"Firebase 연동 실패: {str(e)}"})

    def handle_login(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            self.send_json_response(400, {"success": False, "message": "아이디와 비밀번호를 입력해주세요."})
            return
            
        if username == 'admin' and password == '1234':
            self.send_json_response(200, {
                "success": True, 
                "isAdmin": True, 
                "username": "admin",
                "name": "관리자",
                "redirect": "/admin/"
            })
            return
            
        user = db_get_user(username)
        if user and user.get('password') == password:
            self.send_json_response(200, {
                "success": True,
                "isAdmin": False,
                "username": username,
                "name": user.get('name', username),
                "redirect": "/home/"
            })
        else:
            self.send_json_response(401, {"success": False, "message": "아이디 또는 비밀번호가 올바르지 않습니다."})

    def handle_post_suggestion(self, data):
        username = data.get('username', 'anonymous')
        name = data.get('name', '익명')
        content = data.get('content')
        
        if not content:
            self.send_json_response(400, {"success": False, "message": "건의 내용을 입력해주세요."})
            return
            
        suggestion_id = str(uuid.uuid4())
        new_suggestion = {
            "username": username,
            "name": name,
            "content": content,
            "createdAt": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        try:
            db_put_suggestion(suggestion_id, new_suggestion)
            self.send_json_response(200, {"success": True, "message": "건의사항이 소중히 등록되었습니다!"})
        except Exception as e:
            self.send_json_response(500, {"success": False, "message": f"Firebase 건의사항 등록 실패: {str(e)}"})

    def send_json_response(self, status_code, data):
        response_bytes = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', len(response_bytes))
        self.end_headers()
        self.wfile.write(response_bytes)

def run():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    server_address = ('', PORT)
    httpd = socketserver.TCPServer(server_address, PalMathHandler)
    print(f"PaLMath Server started on http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()

if __name__ == '__main__':
    run()
