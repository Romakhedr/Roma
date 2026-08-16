import os
import logging
import requests
from requests.exceptions import HTTPError, ConnectionError, Timeout, RequestException, InvalidURL, MissingSchema
from typing import Dict, Any

# إعداد نظام تسجيل الأحداث (Logging) الاحترافي لتتبع الحالة
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - Roma-Supabase-KeepAlive - %(levelname)s - %(message)s"
)

class RomaSupabaseKeepAlive:
    """
    فئة هندسية متقدمة لإرسال طلبات دورية (Ping) لمشروع Supabase (Roma)
    لمنع إيقافه التلقائي بسبب الخمول، مع تنقية الروابط ومعالجة الاستثناءات.
    """
    def __init__(self):
        # استرجاع وتنقية المتغيرات لضمان عدم وجود مسافات زائدة
        raw_url = os.getenv("SUPABASE_URL", "")
        self.supabase_url = raw_url.strip() if raw_url else ""
        
        raw_key = os.getenv("SUPABASE_ANON_KEY", "")
        self.supabase_key = raw_key.strip() if raw_key else ""
        
        self.timeout = 15.0

        if not self.supabase_url or not self.supabase_key:
            logging.error("Configuration Warning: 'SUPABASE_URL' or 'SUPABASE_ANON_KEY' environment variables are missing or empty.")

    def _get_secure_headers(self) -> Dict[str, str]:
        """توليد ترويسات المصادقة الآمنة للاتصال بـ Supabase REST API"""
        return {
            "apikey": self.supabase_key,
            "Authorization": f"Bearer {self.supabase_key}",
            "Content-Type": "application/json"
        }

    def ping_project(self) -> Dict[str, Any]:
        """
        إرسال طلب استعلام خفيف لقاعدة البيانات لتأكيد النشاط وتجنب التوقف.
        """
        if not self.supabase_url or not self.supabase_key:
            return {"success": False, "error": "Server configuration incomplete. Missing Supabase credentials."}

        # بناء نقطة النهاية للاتصال الآمن
        base_url = self.supabase_url.rstrip("/")
        endpoint = f"{base_url}/rest/v1/"

        logging.info(f"Dispatching keep-alive ping to Supabase project Roma: {endpoint}")

        try:
            response = requests.get(
                url=endpoint,
                headers=self._get_secure_headers(),
                timeout=self.timeout
            )
            response.raise_for_status()
            
            logging.info("Successfully pinged Supabase project Roma. Status remains active.")
            return {"success": True, "status_code": response.status_code}

        # معالجة استثناءات الروابط والشبكة والطلبات بدقة احترافية
        except (InvalidURL, MissingSchema) as ue:
            logging.error(f"Malformed URL Error: {ue}")
            return {"success": False, "error": "The Supabase URL format is invalid."}
        except ConnectionError as ce:
            logging.error(f"Network Connection Failed: {ce}")
            return {"success": False, "error": "Unable to connect to Supabase servers."}
        except Timeout as te:
            logging.error(f"Request Timeout Error: {te}")
            return {"success": False, "error": "The Supabase server response timed out."}
        except HTTPError as he:
            logging.error(f"Supabase API HTTP Error [{response.status_code}]: {he}")
            return {"success": False, "error": f"API returned error status: {response.status_code}"}
        except RequestException as re:
            logging.error(f"Unhandled Request Exception: {re}")
            return {"success": False, "error": "Network communication error occurred."}
        except Exception as e:
            logging.critical(f"Critical System Failure: {str(e)}")
            return {"success": False, "error": "An internal system error occurred."}

if __name__ == "__main__":
    print("--- Running Supabase Keep-Alive Engine for Project Roma ---")
    engine = RomaSupabaseKeepAlive()
    result = engine.ping_project()
    print("Execution Result:")
    print(result)
